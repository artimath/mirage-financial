import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faGopuram,
  faHandHoldingUsd,
  faLink,
  faShieldAlt,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";

library.add(faGopuram, faWallet, faLink, faShieldAlt, faHandHoldingUsd);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
