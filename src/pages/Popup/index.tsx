import React from "react";
import { render } from "react-dom";

import { PopupComponent } from "./Popup";
import "./global-styles.scss";

render(<PopupComponent />, window.document.querySelector("#app-container"));

if (module.hot) module.hot.accept();
