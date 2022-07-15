import { eventsSlice } from "./events/events-slice";
import { removeEvent, addEvent, loadEvents, postponeEvent, } from "./events/events-slice";
import { createEventSlice } from "./eventCreator/eventCreater-slice";
import { logoutUser, loginUser, createUser } from "./auth/auth-slice";
import { alertSlice } from "./alert/alert-slice";

export const allActions = {
  ...eventsSlice.actions,
  removeEvent,
  addEvent,
  loadEvents,
  postponeEvent,
  ...createEventSlice.actions,
  logoutUser,
  loginUser,
  createUser,
  ...alertSlice.actions,
};
