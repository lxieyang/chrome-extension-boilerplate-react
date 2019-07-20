import React, { Component } from "react";
import Greetings from "../../containers/Greetings/Greetings";
import "./Popup.css";

class Popup extends Component {
  render() {
    return (
      <div>
        <h1>This is the Popup Window</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Greetings />
        </div>
      </div>
    );
  }
}

export default Popup;
