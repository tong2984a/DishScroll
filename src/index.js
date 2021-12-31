import React from "react";
import ReactDOM from "react-dom";

import "./bootstrap-5.1.3-dist/css/bootstrap.min.css"


import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <header>
      </header>

        <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
