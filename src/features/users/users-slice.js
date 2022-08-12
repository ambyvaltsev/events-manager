import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers = createAsyncThunk("@@events/getAllGuests", async () => {
  const { data } = await axios({
    url: `https://62aa4db13b3143855445970a.mockapi.io/users`,
    method: "GET",
  });
  const users = data.map((user) => ({ name: user.login, id: user.id }));

  const usersNames = users.map((user) => user.name);
  return { users, usersNames };
});

const initialState = {
  usersNames: [],
  user: 'admin',
  users: [],
};

export const usersSlice = createSlice({
  name: "@@users",
  initialState: {
    entities: initialState,
    loading: false,
    error: false,
  },
  reducers: {
    selectUser: {
      reducer: (state, action) => {
        state.entities.user = action.payload;
      },
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.entities.users = action.payload.users;
      state.entities.usersNames = action.payload.usersNames;
    });
  },
});

export const { selectUser } = usersSlice.actions;
