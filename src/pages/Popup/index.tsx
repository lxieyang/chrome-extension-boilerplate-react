import React from "react";
import { render } from "react-dom";

import Popup from "./Popup";
import "./index.scss";

render(<Popup />, window.document.querySelector("#app-container"));
