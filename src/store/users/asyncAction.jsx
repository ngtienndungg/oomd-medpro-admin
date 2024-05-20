import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";

export const getUsers = createAsyncThunk(
  "user/usersFetch",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiGetAllUsers(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const addUer = createAsyncThunk(
  "user/addUer",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiAddUser(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, data }, { rejectWithValue }) => {
    const response = await apis.apiUpdateUser(id, data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiDeleteUser(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);
