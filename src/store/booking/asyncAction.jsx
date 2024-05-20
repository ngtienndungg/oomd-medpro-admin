import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";

export const getBookings = createAsyncThunk(
  "Booking/bookingsFetch",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiGetAllBookings(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const addBooking = createAsyncThunk(
  "booking/addBooking",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiAddBooking(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const updateBooking = createAsyncThunk(
  "booking/updateBooking",
  async ({ id, data }, { rejectWithValue }) => {
    const response = await apis.apiUpdateBooking(id, data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const deleteBooking = createAsyncThunk(
  "booking/deleteBooking",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiDeleteBooking(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);
