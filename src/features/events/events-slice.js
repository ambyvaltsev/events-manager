import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createEvent } from "../eventCreator/eventCreater-slice";
import axios from "axios";

//из-за структуры бд обработка изменений идет вынужденно на стороне клиента, что конечно не есть хорошо


export const postponeEvent = createAsyncThunk(
  "@@events/postponeEvent",
  async (idEvent, { getState, dispatch }) => {
    const {login, id} = getState().auth.entities;
    dispatch(postpone(idEvent));
    const events = getState().events.entities.events;
    const response = await axios({
      url: `https://62aa4db13b3143855445970a.mockapi.io/events/${id}`,
      method: "PUT",
      headers: { "Content-Type": " application/json" },
      data: { [login]: [...events] },
    });
  }
);
export const removeEvent = createAsyncThunk(
  "@@events/removeEvent",
  async (event, { getState, dispatch }) => {
    dispatch(remove(event));
    const {id, login} = getState().auth.entities;
    const { events, exceptions } = getState().events.entities;

    const eventConfig = {
      url: `https://62aa4db13b3143855445970a.mockapi.io/events/${id}`,
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      data: { [login]: [...events]},
    }
    const exceptionConfig = {
      url: `https://62aa4db13b3143855445970a.mockapi.io/exceptions/${id}`,
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      data: { [login]: [...exceptions] },
    }
    const response = await Promise.all([axios(eventConfig), axios(exceptionConfig)])
  }
);
export const loadEvents = createAsyncThunk(
  "@@events/loadEvents",
  async (_, { getState }) => {
    const { id, login } = getState().auth.entities;

    const eventsConfig = {
      url: `https://62aa4db13b3143855445970a.mockapi.io/events/${id}`,
      method: "GET",
    }
    const exceptionsConfig = {
      url: `https://62aa4db13b3143855445970a.mockapi.io/exceptions/${id}`,
      method: "GET",
    }
    const response = await Promise.all([axios(eventsConfig), axios(exceptionsConfig)])
 
    return {
      events: response[0].data[login],
      exceptions: response[1].data[login]
    };
  }
);
export const addEvent = createAsyncThunk(
  "@@events/addEvent",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const eventID = getState().events.entities.events.length + 1;
      const {id, login} = getState().auth.entities;
      dispatch(createEvent(eventID));
      const {events, exceptions} = getState().events.entities;
      const event = getState().creator.event;
      if (
        event.exceptions.some((exception) => exceptions.includes(exception))
      ) {
        throw new Error("There is already an event at this time");
      }

      const eventConfig = {
        url: `https://62aa4db13b3143855445970a.mockapi.io/events/${id}`,
        method: "PUT",
        headers: { "Content-Type": " application/json" },
        data: { [login]: [...events, event]},
      }
      const exceptionConfig = {
        url: `https://62aa4db13b3143855445970a.mockapi.io/exceptions/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        data: {
          [login]: [...exceptions, ...event.exceptions],
        },
      }
      const response = await Promise.all([axios(eventConfig), axios(exceptionConfig)])

      return {
        events: response[0].data[login],
        exceptions: response[1].data[login],
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const initialState = {
  ticker: '',
  events: [],
  exceptions: [],
};
export const eventsSlice = createSlice({
  name: "@@events",
  initialState: {
    entities: initialState,
    loading: "idle",
    error: null,
  },
  reducers: {
    postpone: {
      reducer: (state, action) => {
        state.entities.events.map((event) => {
          return event.id == action.payload
            ? (event.isPostponed = true)
            : false;
        });
      },
    },
    defaultEvents: {
      reducer: (state, action) => {
        state.entities = initialState
      }
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
        state.entities.events.map((event, i) => event.id = i + 1)
      },
    },
    updTicker: {
      reducer: (state, action) => {
        state.entities.ticker = action.payload
      }
    }
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

export const { postpone, remove, defaultEvents, updTicker } = eventsSlice.actions;
