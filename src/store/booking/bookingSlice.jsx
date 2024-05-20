import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncAction";
export const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    loading: false,
    successAction: null,
    errorAction: null,
    totalItem: null,
    bookings: [],
  },
  reducers: {
    resetBookingStatus: (state) => {
      state.successAction = null;
      state.errorAction = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actions.getBookings.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(actions.getBookings.fulfilled, (state, action) => {
      state.bookings = action.payload.data;
      state.totalItem = action.payload.counts;
      state.loading = false;
    });
    builder.addCase(actions.getBookings.rejected, (state, action) => {
      state.errorAction = action.message;
      state.loading = false;
    });
    //Add Booking
    builder.addCase(actions.addBooking.pending, (state) => {
      state.loading = true;
      state.successAction = null;
      state.errorAction = null;
    });
    builder.addCase(actions.addBooking.fulfilled, (state, action) => {
      state.loading = false;
      state.successAction = action.payload.message;
    });
    builder.addCase(actions.addBooking.rejected, (state, action) => {
      state.errorAction = action.payload.message;
      state.loading = false;
    });
    //Update Booking
    builder.addCase(actions.updateBooking.pending, (state) => {
      state.loading = true;
      state.successAction = null;
      state.errorAction = null;
    });
    builder.addCase(actions.updateBooking.fulfilled, (state, action) => {
      state.loading = false;
      state.successAction = action.payload.message;
    });
    builder.addCase(actions.updateBooking.rejected, (state, action) => {
      state.errorAction = action.payload.message;
      state.loading = false;
    });
    //Delete Booking
    builder.addCase(actions.deleteBooking.pending, (state) => {
      state.loading = true;
      state.successAction = null;
      state.errorAction = null;
    });
    builder.addCase(actions.deleteBooking.fulfilled, (state, action) => {
      state.loading = false;
      state.successAction = action.payload.message;
      state.totalItem = state.totalItem - 1;
    });
    builder.addCase(actions.deleteBooking.rejected, (state, action) => {
      state.errorAction = action.payload.message;
      state.loading = false;
    });
  },
});

export const { resetBookingStatus } = bookingSlice.actions;
export default bookingSlice.reducer;
