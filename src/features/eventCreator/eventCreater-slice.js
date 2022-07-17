import { createSlice } from "@reduxjs/toolkit";
const checkEvent = (event) => {
  if (event.day + event.days > 8) {
    let leftPart;
    let duration = event.day + event.days - 8;
    let restDays = 7 - event.day + 1;
    let newDate = new Date(event.year, event.month, event.date);
    newDate.setDate(newDate.getDate() + restDays);
    newDate = newDate.getDate();
    leftPart = { ...event, date: newDate, day: 1, days: duration };
    return {
      leftPart: leftPart,
      restDays: restDays,
      location: `${event.time}-${leftPart.day}-${leftPart.date}-${event.month}-${event.year}/${duration}`,
    };
  }
  return null;
};
const defineExceptions = (event) => {
  let exception = [];
  for (let i = 0; i < event.days; i++) {
    let date = new Date(event.year, event.month, event.date);
    date.setDate(date.getDate() + i);
    let day = date.getDay() === 0 ? 7 : date.getDay();
    let month = date.getMonth();
    let year = date.getFullYear();
    for (let j = 0; j < event.hours; j++) {
      exception.push(`${event.time + j}-${day}-${date.getDate()}-${month}-${year}`);
    }
  }
  return exception;
};

const initialState = {
  event: {
    id: null,
    time: 8,
    days: 1,
    hours: 1,
    title: "",
    text: "",
    date: new Date().getDate(),
    day: new Date().getDay() === 0 ? 7 : new Date().getDay(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    locations: [],
    exceptions: [],
    isPostponed: false,
    guest: "admin",
  },
  leftPart: {},
};

export const createEventSlice = createSlice({
  name: "@@createEvent",
  initialState: initialState,
  reducers: {
    createEvent: {
      reducer: (state, action) => {
        //доработать
        let values;
        state.event.exceptions.length = 0;
        if (checkEvent(state.event)) {
          values = checkEvent(state.event);
          state.event.locations.push(values.location);
          state.leftPart = values.leftPart;
          state.event.exceptions.push(...defineExceptions(values.leftPart));
        } else {
          state.leftPart = null;
        }
        let location = `${state.event.time}-${state.event.day}-${state.event.date}-${state.event.month}-${
          state.event.year
        }/${values ? values.restDays : state.event.days}`;
        state.event.locations.push(location);
        state.event.exceptions.push(...defineExceptions(state.event));
        state.event.id = action.payload;
      },
    },
    getDataFromGuest: {
      reducer: (state, action) => {
        state.event.guest = action.payload;
      },
    },
    getDataFromTitle: {
      reducer: (state, action) => {
        state.event.title = action.payload;
      },
    },
    getDataFromText: {
      reducer: (state, action) => {
        state.event.text = action.payload;
      },
    },
    getDataFromTime: {
      reducer: (state, action) => {
        state.event.time = action.payload;
      },
    },
    getDataFromDays: {
      reducer: (state, action) => {
        state.event.days = action.payload;
      },
    },
    getDataFromHours: {
      reducer: (state, action) => {
        state.event.hours = action.payload;
      },
    },
    nextMonth: {
      reducer: (state, action) => {
        let month = state.event.month + action.payload;
        if (month > 11) {
          state.event.month = 0;
          state.event.year = state.event.year + 1;
        } else {
          state.event.month = month;
        }
      },
    },
    prevMonth: {
      reducer: (state, action) => {
        let month = state.event.month - action.payload;
        if (month < 0) {
          state.event.month = 11;
          state.event.year = state.data.year - 1;
        } else {
          state.event.month = month;
        }
      },
    },
    cancelCalendar: {
      reducer: (state, action) => {
        state.event.date = new Date().getDate();
        state.event.day = new Date().getDay();
        state.event.month = new Date().getMonth();
        state.event.year = new Date().getFullYear();
      },
    },
    selectDate: {
      reducer: (state, action) => {
        let selectedDay = new Date(state.event.year, state.event.month, action.payload);
        selectedDay = selectedDay.getDay() === 0 ? 7 : selectedDay.getDay();
        state.event.date = action.payload;
        state.event.day = selectedDay;
      },
    },
    cancelEventCreator: {
      reducer: (state, action) => {
        state.event = initialState.event;
      },
    },
  },
});

export const {
  getDataFromTitle,
  getDataFromText,
  getDataFromTime,
  getDataFromDays,
  getDataFromHours,
  nextMonth,
  prevMonth,
  cancelCalendar,
  selectDate,
  cancelEventCreator,
  createEvent,
} = createEventSlice.actions;
