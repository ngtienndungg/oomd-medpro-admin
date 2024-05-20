import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncAction";
export const specialtySlice = createSlice({
  name: "clinic",
  initialState: {
    loading: false,
    successAction: null,
    errorAction: null,
    totalItem: null,
    specialtys: [],
  },
  reducers: {
    resetSpecialtyStatus: (state) => {
      state.successAction = null;
      state.errorAction = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actions.getSpecialtys.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(actions.getSpecialtys.fulfilled, (state, action) => {
      state.specialtys = action.payload.data;
      state.totalItem = action.payload.counts;
      state.loading = false;
    });
    builder.addCase(actions.getSpecialtys.rejected, (state, action) => {
      state.errorAction = action.message;
      state.loading = false;
    });
    //Add user
    builder.addCase(actions.addSpecialty.pending, (state) => {
      state.loading = true;
      state.successAction = null;
      state.errorAction = null;
    });
    builder.addCase(actions.addSpecialty.fulfilled, (state, action) => {
      state.loading = false;
      state.successAction = action.payload.message;
    });
    builder.addCase(actions.addSpecialty.rejected, (state, action) => {
      state.errorAction = action.payload.message;
      state.loading = false;
    });
    //Update user
    builder.addCase(actions.updateSpecialty.pending, (state) => {
      state.loading = true;
      state.successAction = null;
      state.errorAction = null;
    });
    builder.addCase(actions.updateSpecialty.fulfilled, (state, action) => {
      state.loading = false;
      state.successAction = action.payload.message;
    });
    builder.addCase(actions.updateSpecialty.rejected, (state, action) => {
      state.errorAction = action.payload.message;
      state.loading = false;
    });
    //Delete user
    builder.addCase(actions.deleteSpecialty.pending, (state) => {
      state.loading = true;
      state.successAction = null;
      state.errorAction = null;
    });
    builder.addCase(actions.deleteSpecialty.fulfilled, (state, action) => {
      state.loading = false;
      state.successAction = action.payload.message;
      state.totalItem = state.totalItem - 1;
    });
    builder.addCase(actions.deleteSpecialty.rejected, (state, action) => {
      state.errorAction = action.payload.message;
      state.loading = false;
    });
  },
});

export const { resetSpecialtyStatus } = specialtySlice.actions;
export default specialtySlice.reducer;
