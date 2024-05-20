import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";

export const getSpecialtys = createAsyncThunk(
  "specialty/specialtysFetch",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiGetAllSpecialtys(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);

export const addSpecialty = createAsyncThunk(
  "user/addSpecialty",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiAddSpecialty(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const updateSpecialty = createAsyncThunk(
  "user/updateSpecialty",
  async ({ id, data }, { rejectWithValue }) => {
    const response = await apis.apiUpdateSpecialty(id, data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const deleteSpecialty = createAsyncThunk(
  "user/deleteSpecialty",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiDeleteSpecialty(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);
