import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";

export const getSchedules = createAsyncThunk(
  "schedule/schedulesFetch",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiGetAllSchedules(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const addSchedule = createAsyncThunk(
  "schedule/addSchedule",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiAddSchedule(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const updateSchedule = createAsyncThunk(
  "schedule/updateSchedule",
  async ({ id, data }, { rejectWithValue }) => {
    const response = await apis.apiUpdateSchedule(id, data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const deleteSchedule = createAsyncThunk(
  "schedule/deleteSchedule",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiDeleteSchedule(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);

export const getSchedulesByHost = createAsyncThunk(
  "doctor/schedulesFetchByHost",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiGetAllSchedulesByHost(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);
