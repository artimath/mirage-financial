import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faGopuram, faWallet } from "@fortawesome/free-solid-svg-icons";

library.add(faGopuram, faWallet);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
