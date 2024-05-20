import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncAction";
export const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    loading: false,
    successAction: null,
    errorAction: null,
    totalItem: null,
    doctors: [],
  },
  reducers: {
    resetDoctorStatus: (state) => {
      state.successAction = null;
      state.errorAction = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actions.getDoctors.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(actions.getDoctors.fulfilled, (state, action) => {
      state.doctors = action.payload.data;
      state.totalItem = action.payload.counts;
      state.loading = false;
    });
    builder.addCase(actions.getDoctors.rejected, (state, action) => {
      state.errorAction = action.message;
      state.loading = false;
    });
    //Add Doctor
    builder.addCase(actions.addDoctor.pending, (state) => {
      state.loading = true;
      state.successAction = null;
      state.errorAction = null;
    });
    builder.addCase(actions.addDoctor.fulfilled, (state, action) => {
      state.loading = false;
      state.successAction = action.payload.message;
    });
    builder.addCase(actions.addDoctor.rejected, (state, action) => {
      state.errorAction = action.payload.message;
      state.loading = false;
    });
    //Update Doctor
    builder.addCase(actions.updateDoctor.pending, (state) => {
      state.loading = true;
      state.successAction = null;
      state.errorAction = null;
    });
    builder.addCase(actions.updateDoctor.fulfilled, (state, action) => {
      state.loading = false;
      state.successAction = action.payload.message;
    });
    builder.addCase(actions.updateDoctor.rejected, (state, action) => {
      state.errorAction = action.payload.message;
      state.loading = false;
    });
    //Delete Doctor
    builder.addCase(actions.deleteDoctor.pending, (state) => {
      state.loading = true;
      state.successAction = null;
      state.errorAction = null;
    });
    builder.addCase(actions.deleteDoctor.fulfilled, (state, action) => {
      state.loading = false;
      state.successAction = action.payload.message;
      state.totalItem = state.totalItem - 1;
    });
    builder.addCase(actions.deleteDoctor.rejected, (state, action) => {
      state.errorAction = action.payload.message;
      state.loading = false;
    });
    //Get Doctor By Host
    builder.addCase(actions.getDoctorsByHost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(actions.getDoctorsByHost.fulfilled, (state, action) => {
      state.doctors = action.payload.data;
      state.totalItem = action.payload.counts;
      state.loading = false;
    });
    builder.addCase(actions.getDoctorsByHost.rejected, (state, action) => {
      state.errorAction = action.message;
      state.loading = false;
    });
  },
});

export const { resetDoctorStatus } = doctorSlice.actions;
export default doctorSlice.reducer;
