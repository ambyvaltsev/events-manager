import { eventsSlice } from "./events/events-slice";
import { removeEvent, addEvent, loadEvents, postponeEvent, getAllGuests } from "./events/events-slice";
import { createEventSlice } from "./eventCreator/eventCreater-slice";
import { logoutUser, loginUser, createUser } from "./auth/auth-slice";
import { alertSlice } from "./alert/alert-slice";
import { usersSlice } from "./users/users-slice";
import { getUsers } from "./users/users-slice";

export const allActions = {
  ...eventsSlice.actions,
  removeEvent,
  addEvent,
  loadEvents,
  postponeEvent,
  getUsers,
  ...createEventSlice.actions,
  logoutUser,
  loginUser,
  createUser,
  ...alertSlice.actions,
  ...usersSlice.actions
};
