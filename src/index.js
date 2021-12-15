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
      <main>
        <section class="py-5 text-center container">
          <div class="row py-lg-5">
            <div class="col-lg-6 col-md-8 mx-auto">
              <h1 class="fw-light">VEGAN DISH DIRECTORY</h1>
            </div>
          </div>
        </section>
        <App />
      </main>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
