import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createEvent } from "../eventCreator/eventCreater-slice";
import axios from "axios";

const validateDate = (event) => {
  const { time, date, month, year } = event;
  return new Date(year, month, date, time) <= new Date() ? true : false;
};

export const postponeEvent = createAsyncThunk(
  "@@events/postponeEvent",
  async (idEvent, { getState, dispatch }) => {
    const { login, id } = getState().auth.entities;
    const { guests, guest } = getState().events.entities;
    const fetchGuest = guests.find((user) => user.name === guest);
    const fetchId = login === "admin" ? fetchGuest.id : id;
    const fetchName = login === "admin" ? fetchGuest.name : login;
    dispatch(postpone(idEvent));
    const events = getState().events.entities.events;
    const response = await axios({
      url: `https://62aa4db13b3143855445970a.mockapi.io/events/${fetchId}`,
      method: "PUT",
      headers: { "Content-Type": " application/json" },
      data: { [fetchName]: [...events] },
    });
  }
);
export const removeEvent = createAsyncThunk("@@events/removeEvent", async (event, { getState, dispatch }) => {
  dispatch(remove(event));
  const { guests, guest } = getState().events.entities;
  const fetchGuest = guests.find((user) => user.name === guest);
  const exceptionsGuest = await axios({
    url: `https://62aa4db13b3143855445970a.mockapi.io/exceptions/${fetchGuest.id}`,
    method: "GET",
  });
  const eventsGuest = await axios({
    url: `https://62aa4db13b3143855445970a.mockapi.io/events/${fetchGuest.id}`,
    method: "GET",
  });
  const exceptions = exceptionsGuest.data[guest].filter((excep) => !event.exceptions.includes(excep));
  const events = eventsGuest.data[guest].filter((ev) => ev.id !== event.id);

  const eventConfig = {
    url: `https://62aa4db13b3143855445970a.mockapi.io/events/${fetchGuest.id}`,
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    data: { [guest]: [...events] },
  };
  const exceptionConfig = {
    url: `https://62aa4db13b3143855445970a.mockapi.io/exceptions/${fetchGuest.id}`,
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    data: { [guest]: [...exceptions] },
  };
  const response = await Promise.all([axios(eventConfig), axios(exceptionConfig)]);
});
export const loadEvents = createAsyncThunk("@@events/loadEvents", async (_, { getState }) => {
  const { guests, guest } = getState().events.entities;
  const fetchGuest = guests.find((user) => user.name === guest);
  const fetchId = fetchGuest.id;
  const fetchName = fetchGuest.name;
  const eventsConfig = {
    url: `https://62aa4db13b3143855445970a.mockapi.io/events/${fetchId}`,
    method: "GET",
  };
  const exceptionsConfig = {
    url: `https://62aa4db13b3143855445970a.mockapi.io/exceptions/${fetchId}`,
    method: "GET",
  };
  const response = await Promise.all([axios(eventsConfig), axios(exceptionsConfig)]);
  return {
    events: response[0].data[fetchName],
    exceptions: response[1].data[fetchName],
  };
});
export const addEvent = createAsyncThunk(
  "@@events/addEvent",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { guests, guest } = getState().events.entities;
    const {guest: selectedGuest } = getState().creator.event;
    dispatch(createEvent());
    const event = getState().creator.event;
    const fetchGuest = guests.find((user) => user.name === selectedGuest);
    const exceptionsGuest = await axios({
      url: `https://62aa4db13b3143855445970a.mockapi.io/exceptions/${fetchGuest.id}`,
      method: "GET",
    });
    const eventsGuest = await axios({
      url: `https://62aa4db13b3143855445970a.mockapi.io/events/${fetchGuest.id}`,
      method: "GET",
    });

    if (validateDate(event)) {
      return rejectWithValue("Can't select past time");
    }
    
    if (
      exceptionsGuest.length > 0 &&
      event.exceptions.some((exception) => exceptionsGuest.data[guest].includes(exception))
    ) {
      return rejectWithValue("There is already an event at this time");
    }
    const eventConfig = {
      url: `https://62aa4db13b3143855445970a.mockapi.io/events/${fetchGuest.id}`,
      method: "PUT",
      headers: { "Content-Type": " application/json" },
      data: { [selectedGuest]: [...eventsGuest.data[selectedGuest], event] },
    };
    const exceptionConfig = {
      url: `https://62aa4db13b3143855445970a.mockapi.io/exceptions/${fetchGuest.id}`,
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      data: {
        [selectedGuest]: [...exceptionsGuest.data[selectedGuest], ...event.exceptions],
      },
    };
    const response = await Promise.all([axios(eventConfig), axios(exceptionConfig)]);
    if (guest === selectedGuest) {
      return {
        events: response[0].data[guest],
        exceptions: response[1].data[guest],
      };
    }
  }
);
export const getAllGuests = createAsyncThunk("@@events/getAllGuests", async () => {
  const { data } = await axios({
    url: `https://62aa4db13b3143855445970a.mockapi.io/users`,
    method: "GET",
  });
  const guests = data.map((user) => ({ name: user.login, id: user.id }));

  const guestsNames = guests.map((user) => user.name);
  return { guests, guestsNames };
});
const initialState = {
  events: [],
  exceptions: [],
  guests: [],
  guestsNames: [],
  guest: "admin",
};
export const eventsSlice = createSlice({
  name: "@@events",
  initialState: {
    entities: initialState,
    loading: "idle",
    error: null,
  },
  reducers: {
    selectGuest: {
      reducer: (state, action) => {
        state.entities.guest = action.payload;
      },
    },
    postpone: {
      reducer: (state, action) => {
        state.entities.events.map((event) => {
          return event.id === action.payload ? (event.isPostponed = true) : false;
        });
      },
    },
    defaultEvents: {
      reducer: (state, action) => {
        state.entities = initialState;
      },
    },
    remove: {
      reducer: (state, action) => {
        const exceptions = state.entities.exceptions.filter((exception) => {
          return !action.payload.exceptions.includes(exception);
        });
        state.entities.exceptions = exceptions;
        const events = state.entities.events.filter((event) => {
          return event.id !== action.payload.id;
        });
        state.entities.events = events;
        state.entities.events.map((event, i) => (event.id = i + 1));
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addEvent.fulfilled, (state, action) => {
        if (action.payload) {
          state.entities.events = action.payload.events;
          state.entities.exceptions = action.payload.exceptions;
        }
      })
      .addCase(loadEvents.fulfilled, (state, action) => {
        state.entities.events = action.payload.events;
        state.entities.exceptions = action.payload.exceptions;
      })
      .addCase(getAllGuests.fulfilled, (state, action) => {
        state.entities.guests = action.payload.guests;
        state.entities.guestsNames = action.payload.guestsNames;
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = action.payload || action.error.message;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state, action) => {
          state.error = null;
        }
      );
  },
});

export const { postpone, remove, defaultEvents, selectGuest } = eventsSlice.actions;
