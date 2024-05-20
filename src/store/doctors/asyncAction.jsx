import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";

export const getDoctors = createAsyncThunk(
  "doctor/doctorsFetch",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiGetAllDoctors(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const addDoctor = createAsyncThunk(
  "doctor/addDoctor",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiAddDoctor(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const updateDoctor = createAsyncThunk(
  "doctor/updateDoctor",
  async ({ id, data }, { rejectWithValue }) => {
    const response = await apis.apiUpdateDoctor(id, data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const deleteDoctor = createAsyncThunk(
  "doctor/deleteDoctor",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiDeleteDoctor(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);

export const getDoctorsByHost = createAsyncThunk(
  "doctor/doctorsFetchByHost",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiGetAllDoctorsByHost(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);
