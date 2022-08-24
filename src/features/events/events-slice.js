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
    const { users, user } = getState().users.entities;
    const fetchGuest = users.find((u) => u.name === user);
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
  const { users, user } = getState().users.entities;
  const fetchGuest = users.find((u) => u.name === user);
  const exceptionsGuest = await axios({
    url: `https://62aa4db13b3143855445970a.mockapi.io/exceptions/${fetchGuest.id}`,
    method: "GET",
  });
  const eventsGuest = await axios({
    url: `https://62aa4db13b3143855445970a.mockapi.io/events/${fetchGuest.id}`,
    method: "GET",
  });
  const exceptions = exceptionsGuest.data[user].filter((excep) => !event.exceptions.includes(excep));
  const events = eventsGuest.data[user].filter((ev) => ev.id !== event.id);

  const eventConfig = {
    url: `https://62aa4db13b3143855445970a.mockapi.io/events/${fetchGuest.id}`,
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    data: { [user]: [...events] },
  };
  const exceptionConfig = {
    url: `https://62aa4db13b3143855445970a.mockapi.io/exceptions/${fetchGuest.id}`,
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    data: { [user]: [...exceptions] },
  };
  const response = await Promise.all([axios(eventConfig), axios(exceptionConfig)]);
});
export const loadEvents = createAsyncThunk("@@events/loadEvents", async (_, { getState }) => {
  const { users, user } = getState().users.entities;
  const fetchGuest = users.find((u) => u.name === user);
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
    const { users, user } = getState().users.entities;
    const { selectedUser } = getState().creator.event;
    dispatch(createEvent());
    const event = getState().creator.event;
    const fetchGuest = users.find((u) => u.name === selectedUser);

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

    if (event.exceptions.some((exception) => exceptionsGuest.data[selectedUser].includes(exception))) {
      return rejectWithValue("There is already an event at this time");
    }
    const eventConfig = {
      url: `https://62aa4db13b3143855445970a.mockapi.io/events/${fetchGuest.id}`,
      method: "PUT",
      headers: { "Content-Type": " application/json" },
      data: { [selectedUser]: [...eventsGuest.data[selectedUser], event] },
    };
    const exceptionConfig = {
      url: `https://62aa4db13b3143855445970a.mockapi.io/exceptions/${fetchGuest.id}`,
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      data: {
        [selectedUser]: [...exceptionsGuest.data[selectedUser], ...event.exceptions],
      },
    };
    const response = await Promise.all([axios(eventConfig), axios(exceptionConfig)]);
    if (user === selectedUser) {
      return {
        events: response[0].data[user],
        exceptions: response[1].data[user],
      };
    }
  }
);

const initialState = {
  events: [],
  exceptions: [],
};
export const eventsSlice = createSlice({
  name: "@@events",
  initialState: {
    entities: initialState,
    loading: false,
    error: null,
  },
  reducers: {
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
