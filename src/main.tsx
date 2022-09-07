import "~/assets/style/index.scss";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./pages/App";

ReactDOM.createRoot(document.getElementById("rm")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
