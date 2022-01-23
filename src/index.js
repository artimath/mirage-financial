import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import Portfolio from "./routes/Portfolio";
import { WalletProvider } from "./contexts/WalletContext";
import Home from "./routes/Home";

// Don't think we need this icon import here, but leaving it for now until sure

// import { library } from "@fortawesome/fontawesome-svg-core";
// import {
//   faGopuram,
//   faHandHoldingUsd,
//   faLink,
//   faShieldAlt,
//   faWallet,
// } from "@fortawesome/free-solid-svg-icons";

// library.add(faGopuram, faWallet, faLink, faShieldAlt, faHandHoldingUsd);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <WalletProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="portfolio" element={<Portfolio />} />
          </Route>
        </Routes>
      </WalletProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
