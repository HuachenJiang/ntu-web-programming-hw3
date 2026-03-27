import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

// 统一从这里挂载根组件，保留 StrictMode 以便在开发阶段提早发现副作用问题。
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
