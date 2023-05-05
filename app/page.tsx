"use client";

/* eslint-disable filenames/match-regex */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import React from "react";

import { Provider } from "react-redux";

import store from "@redux/store";
import "@features/localization/localization";
import reportWebVitals from "@src/reportWebVitals";

import "./index.scss";

export default function Page() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <h1>Hello World!</h1>
      </Provider>
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
