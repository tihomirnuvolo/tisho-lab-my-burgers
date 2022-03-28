import React from "react";
import ReactDOM from "react-dom";
import { App } from "@components/App";
import { Provider } from "react-redux";
import store from "./store";

const appName = "My Burgers";

(function initApp(): void {
  const id = "react-root";
  const root = document.getElementById(id);
  if (root) {
    ReactDOM.render(
      <Provider store={store}>
        <App dataset={root.dataset} appName={appName} />
      </Provider>,
      root
    );
  } else {
    throw Error(
      `Missing root DOM element. Did you forget to include an element with the id ${id}?`
    );
  }
})();
