import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncAction";
export const scheduleSlice = createSlice({
  name: "Schedule",
  initialState: {
    loading: false,
    successAction: null,
    errorAction: null,
    totalItem: null,
    schedules: [],
  },
  reducers: {
    resetScheduleStatus: (state) => {
      state.successAction = null;
      state.errorAction = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actions.getSchedules.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(actions.getSchedules.fulfilled, (state, action) => {
      state.schedules = action.payload.data;
      state.totalItem = action.payload.counts;
      state.loading = false;
    });
    builder.addCase(actions.getSchedules.rejected, (state, action) => {
      state.errorAction = action.message;
      state.loading = false;
    });
    //Add Schedule
    builder.addCase(actions.addSchedule.pending, (state) => {
      state.loading = true;
      state.successAction = null;
      state.errorAction = null;
    });
    builder.addCase(actions.addSchedule.fulfilled, (state, action) => {
      state.loading = false;
      state.successAction = action.payload.message;
    });
    builder.addCase(actions.addSchedule.rejected, (state, action) => {
      state.errorAction = action.payload.message;

      state.loading = false;
    });
    //Update Schedule
    builder.addCase(actions.updateSchedule.pending, (state) => {
      state.loading = true;
      state.successAction = null;
      state.errorAction = null;
    });
    builder.addCase(actions.updateSchedule.fulfilled, (state, action) => {
      state.loading = false;
      state.successAction = action.payload.message;
    });
    builder.addCase(actions.updateSchedule.rejected, (state, action) => {
      state.errorAction = action.payload.message;
      state.loading = false;
    });
    //Delete Schedule
    builder.addCase(actions.deleteSchedule.pending, (state) => {
      state.loading = true;
      state.successAction = null;
      state.errorAction = null;
    });
    builder.addCase(actions.deleteSchedule.fulfilled, (state, action) => {
      state.loading = false;
      state.successAction = action.payload.message;
      state.totalItem = state.totalItem - 1;
    });
    builder.addCase(actions.deleteSchedule.rejected, (state, action) => {
      state.errorAction = action.payload.message;
      state.loading = false;
    });
    //Get Schedule By Host
    builder.addCase(actions.getSchedulesByHost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(actions.getSchedulesByHost.fulfilled, (state, action) => {
      state.schedules = action.payload.data;
      state.totalItem = action.payload.counts;
      state.loading = false;
    });
    builder.addCase(actions.getSchedulesByHost.rejected, (state, action) => {
      state.errorAction = action.message;
      state.loading = false;
    });
  },
});

export const { resetScheduleStatus } = scheduleSlice.actions;
export default scheduleSlice.reducer;
