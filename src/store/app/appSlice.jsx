import { createSlice } from "@reduxjs/toolkit";

export const appState = {
  open: false,
  meesage: "",
  title: "",
  severity: "info",

  isOpenSidebar:
    localStorage.getItem("isOpenSidebar") === "true" ? true : false,
};

export const appSlice = createSlice({
  name: "app",
  initialState: appState,
  reducers: {
    changeOpenSidebar: (state, action) => {
      state.isOpenSidebar = action.payload.isOpenSidebar;
      localStorage.setItem("isOpenSidebar", state.isOpenSidebar);
    },
    addNotification: (state, action) => ({
      ...appState,
      ...action.payload,
      open: true,
    }),
    clearNotification: (state) => ({
      ...state,
      open: false,
    }),
  },
});

export const { addNotification, clearNotification, changeOpenSidebar } =
  appSlice.actions;
export default appSlice.reducer;
