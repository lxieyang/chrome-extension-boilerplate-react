import React from "react";
// import Greetings from "../../containers/Greetings/Greetings";
import "./Popup.scss";
const logo = require("../../assets/img/logo.svg");

const Popup = () => {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/pages/Popup/Popup.js</code> and save to reload.
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
            </header>
        </div>
    );
};

export default Popup;
