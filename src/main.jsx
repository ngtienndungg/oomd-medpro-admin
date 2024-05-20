import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import "./i18n.jsx";
import { Toast } from "./components/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
          <Toast />
        </BrowserRouter>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
