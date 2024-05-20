import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncAction";
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    isLoggedIn: false,
    current: null,
    token: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
      state.current = action.payload.current;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.token = null;
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actions.getCurrent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.loading = false;
    });
    builder.addCase(actions.getCurrent.rejected, (state, action) => {
      state.current = null;
      state.isLoggedIn = false;
      state.token = null;
      state.loading = false;
    });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
