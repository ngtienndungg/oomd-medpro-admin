import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncAction";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    successAction: null,
    errorAction: null,
    totalItem: null,
    users: [],
  },
  reducers: {
    resetUserStatus: (state) => {
      state.successAction = null;
      state.errorAction = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actions.getUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(actions.getUsers.fulfilled, (state, action) => {
      state.users = action.payload.data;
      state.totalItem = action.payload.counts;
      state.loading = false;
    });
    builder.addCase(actions.getUsers.rejected, (state, action) => {
      state.errorAction = action.message;
      state.loading = false;
    });
    //Add user
    builder.addCase(actions.addUer.pending, (state) => {
      state.loading = true;
      state.successAction = null;
      state.errorAction = null;
    });
    builder.addCase(actions.addUer.fulfilled, (state, action) => {
      state.loading = false;
      state.successAction = action.payload.message;
    });
    builder.addCase(actions.addUer.rejected, (state, action) => {
      state.errorAction = action.payload.message;
      state.loading = false;
    });
    //Update user
    builder.addCase(actions.updateUser.pending, (state) => {
      state.loading = true;
      state.successAction = null;
      state.errorAction = null;
    });
    builder.addCase(actions.updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.successAction = action.payload.message;
    });
    builder.addCase(actions.updateUser.rejected, (state, action) => {
      state.errorAction = action.payload.message;
      state.loading = false;
    });
    //Delete user
    builder.addCase(actions.deleteUser.pending, (state) => {
      state.loading = true;
      state.successAction = null;
      state.errorAction = null;
    });
    builder.addCase(actions.deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.successAction = action.payload.message;
      state.totalItem = state.totalItem - 1;
    });
    builder.addCase(actions.deleteUser.rejected, (state, action) => {
      state.errorAction = action.payload.message;
      state.loading = false;
    });
  },
});

export const { resetUserStatus } = userSlice.actions;
export default userSlice.reducer;
