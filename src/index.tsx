import React from "react";
import ReactDOM from "react-dom";
import { App } from "@components/App";

const appName: string = "My Burgers";

(function initApp(): void {
  const id = "react-root";
  const root = document.getElementById(id);
  if (root) {
    ReactDOM.render(<App dataset={root.dataset} appName={appName} />, root);
  } else {
    throw Error(
      `Missing root DOM element. Did you forget to include an element with the id ${id}?`
    );
  }
})();
