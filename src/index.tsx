import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Cabecalho from "./componentes/Cabecalho";
import Formulario from "./componentes/Formulario";

ReactDOM.render(
  <React.StrictMode>
    <Cabecalho />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
