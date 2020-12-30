import React from "react";
import { render } from "react-dom";

import { PopupComponent } from "./Popup";
import "./index.scss";

render(<PopupComponent />, window.document.querySelector("#app-container"));
