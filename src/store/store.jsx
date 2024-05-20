import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import authSlice from "./auth/authSlice";
import appSlice from "./app/appSlice";
import clinicSlice from "./clinics/clinicSlice";
import specialtySlice from "./specialtys/specialtySlice";
import doctorSlice from "./doctors/doctorSlice";
import bookingSlice from "./booking/bookingSlice";
import userSlice from "./users/userSlice";
import scheduleSlice from "./schedules/scheduleslice";

const commonConfig = {
  key: "auth",
  storage,
};

const userConfig = {
  ...commonConfig,
  whitelist: ["isLoggedIn", "token", "current"],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(userConfig, authSlice),
    user: userSlice,
    doctor: doctorSlice,
    clinic: clinicSlice,
    specialty: specialtySlice,
    schedule: scheduleSlice,
    booking: bookingSlice,
    app: appSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
