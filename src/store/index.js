import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "../features/alert/alert-slice";
import { authSlice } from "../features/auth/auth-slice";
import { createEventSlice } from "../features/eventCreator/eventCreater-slice";
import { eventsSlice } from "../features/events/events-slice";
import { loadState, saveState } from "./localStorage";
import { throttle } from "./throttle";



const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    creator: createEventSlice.reducer,
    events: eventsSlice.reducer,
    alert: alertSlice.reducer,
    auth: authSlice.reducer,
  },
  preloadedState,
});

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);
