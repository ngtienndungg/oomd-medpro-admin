import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncAction";
export const clinicSlice = createSlice({
  name: "clinic",
  initialState: {
    loading: false,
    successAction: null,
    errorAction: null,
    totalItem: null,
    clinics: [],
  },
  reducers: {
    resetClinicStatus: (state) => {
      state.successAction = null;
      state.errorAction = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actions.getClinics.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(actions.getClinics.fulfilled, (state, action) => {
      state.clinics = action.payload.data;
      state.totalItem = action.payload.counts;
      state.loading = false;
    });
    builder.addCase(actions.getClinics.rejected, (state, action) => {
      state.errorAction = action.message;
      state.loading = false;
    });
    //Add Clinic
    builder.addCase(actions.addClinic.pending, (state) => {
      state.loading = true;
      state.successAction = null;
      state.errorAction = null;
    });
    builder.addCase(actions.addClinic.fulfilled, (state, action) => {
      state.loading = false;
      state.successAction = action.payload.message;
    });
    builder.addCase(actions.addClinic.rejected, (state, action) => {
      state.errorAction = action.payload.message;
      state.loading = false;
    });
    //Update Clinic
    builder.addCase(actions.updateClinic.pending, (state) => {
      state.loading = true;
      state.successAction = null;
      state.errorAction = null;
    });
    builder.addCase(actions.updateClinic.fulfilled, (state, action) => {
      state.loading = false;
      state.successAction = action.payload.message;
    });
    builder.addCase(actions.updateClinic.rejected, (state, action) => {
      state.errorAction = action.payload.message;
      state.loading = false;
    });
    //Delete Clinic
    builder.addCase(actions.deleteClinic.pending, (state) => {
      state.loading = true;
      state.successAction = null;
      state.errorAction = null;
    });
    builder.addCase(actions.deleteClinic.fulfilled, (state, action) => {
      state.loading = false;
      state.successAction = action.payload.message;
      state.totalItem = state.totalItem - 1;
    });
    builder.addCase(actions.deleteClinic.rejected, (state, action) => {
      state.errorAction = action.payload.message;
      state.loading = false;
    });
  },
});

export const { resetClinicStatus } = clinicSlice.actions;
export default clinicSlice.reducer;
