import React from "react";
import ReactDOM from "react-dom";
import { Poll } from "./Poll";

ReactDOM.render(
  <React.StrictMode>
    <Poll pollId="tax-spending" />,
  </React.StrictMode>,
  document.getElementById("opinary-widget")
);
