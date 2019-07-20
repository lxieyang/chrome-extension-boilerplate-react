import React, { Component } from "react";
import icon from "../../assets/img/icon-128.png";

class GreetingComponent extends Component {
  state = {
    name: "dev"
  };

  render() {
    return (
      <div>
        <p>Hello, {this.state.name}!</p>
        <img src={icon} />
      </div>
    );
  }
}

export default GreetingComponent;
