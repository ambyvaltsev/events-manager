import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { defaultEvents } from "../events/events-slice";

export const createUser = createAsyncThunk("@@auth/createUser", async (user, { rejectWithValue }) => {
  const checkUser = await axios({
    url: `https://62aa4db13b3143855445970a.mockapi.io/users?login=${user.login}`,
    method: "GET",
  });

  if (checkUser.data.some((u) => u.login === user.login)) {
   return  rejectWithValue("There is already a user with the same name");
  }
  const newUser = {
    login: user.login,
    password: user.password,
    isAuth: true,
  };
  const newUserEvents = {
    [user.login]: [],
  };
  const newUserExceptions = {
    [user.login]: [],
  };

  const newUserConfig = {
    url: "https://62aa4db13b3143855445970a.mockapi.io/users",
    method: "POST",
    headers: { "Content-Type": " application/json" },
    data: newUser,
  };
  const eventsConfig = {
    url: "https://62aa4db13b3143855445970a.mockapi.io/events",
    method: "POST",
    headers: { "Content-Type": " application/json" },
    data: newUserEvents,
  };
  const exceptionsConfig = {
    url: "https://62aa4db13b3143855445970a.mockapi.io/exceptions",
    method: "POST",
    headers: { "Content-Type": " application/json" },
    data: newUserExceptions,
  };

  const response = await Promise.all([axios(newUserConfig), axios(eventsConfig), axios(exceptionsConfig)]);

  return response[0].data;
});
export const loginUser = createAsyncThunk("@@auth/loginUser", async (user, { rejectWithValue }) => {
  const checkUser = await axios({
    url: `https://62aa4db13b3143855445970a.mockapi.io/users?login=${user.login}&password=${user.password}`,
    method: "GET",
  });

  if (checkUser.data.length === 0) {
    return  rejectWithValue("Incorrect login or password");
  }
  //дополнительная проверка, тк мокапи не позволяет нормальный поиск по параметрам (возвращает все совпадения)
  if (checkUser.data[0].login !== user.login || checkUser.data[0].password !== user.password) {
    return  rejectWithValue("Incorrect login or password");
  }

  const login = await axios({
    url: `https://62aa4db13b3143855445970a.mockapi.io/users/${checkUser.data[0].id}`,
    method: "PUT",
    headers: { "Content-Type": " application/json" },
    data: { isAuth: true },
  });
  return login.data;
});
export const logoutUser = createAsyncThunk("@@auth/logoutUser", async (_, { getState, dispatch }) => {
  dispatch(defaultEvents());
  const userID = getState().auth.entities.id;
  const response = axios({
    url: `https://62aa4db13b3143855445970a.mockapi.io/users/${userID}`,
    method: "PUT",
    data: { isAuth: false },
  });
});

const initialState = {
  isAuth: false,
  login: "",
  id: null,
};

export const authSlice = createSlice({
  name: "@@auth",
  initialState: {
    entities: initialState,
    loading: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled, (state, action) => {
        state.entities.login = action.payload.login;
        state.entities.isAuth = true;
        state.entities.id = action.payload.id;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.entities.login = action.payload.login;
        state.entities.id = action.payload.id;
        state.entities.isAuth = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.entities = initialState;
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
