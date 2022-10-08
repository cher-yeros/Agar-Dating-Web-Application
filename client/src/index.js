import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./utils/localization";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Suspense } from "react";
import { CircularProgress } from "@mui/material";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f9403b",
    },
    secondary: {
      main: "#E33E7F",
    },
    white: {
      main: "#fff",
    },
  },
});

ReactDOM.render(
  <Suspense fallback={<CircularProgress />}>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </Suspense>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
