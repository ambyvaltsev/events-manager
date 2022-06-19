import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  text: "",
};

export const alertSlice = createSlice({
  name: "@@alert",
  initialState: initialState,
  reducers: {
    showAlert: {
      reducer: (state, action) => {
        state.status = true;
        state.text = action.payload;
      },
    },
    hideAlert: {
      reducer: (state, action) => {
        state.status = false;
        state.text = "";
      },
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
