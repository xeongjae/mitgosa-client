import React from "react";
import "./index.scss";

import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";

import App from "./App";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
