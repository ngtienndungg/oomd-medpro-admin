import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";

export const getClinics = createAsyncThunk(
  "clinic/clinicsFetch",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiGetAllClinics(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const addClinic = createAsyncThunk(
  "user/addClinic",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiAddClinic(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const updateClinic = createAsyncThunk(
  "user/updateClinic",
  async ({ id, data }, { rejectWithValue }) => {
    const response = await apis.apiUpdateClinic(id, data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const deleteClinic = createAsyncThunk(
  "user/deleteClinic",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiDeleteClinic(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const addSpecialtyOfClinic = createAsyncThunk(
  "user/addSpecialtyOfClinic",
  async ({ id, data }, { rejectWithValue }) => {
    const response = await apis.apiAddSpecialtyClinic(id, data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const deleteSpecialtyOfClinic = createAsyncThunk(
  "user/deleteSpecialtyOfClinic",
  async ({ id, data }, { rejectWithValue }) => {
    const response = await apis.apiDeleteSpecialtyClinic(id, data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);
