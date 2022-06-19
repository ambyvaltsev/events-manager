import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/index";
import "./index.scss";
import "overlayscrollbars/css/OverlayScrollbars.min.css";



const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
      <App />
  </Provider>
);
