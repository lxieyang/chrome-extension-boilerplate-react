import React, { useEffect } from "react";
import { subscribeToActiveTabUrlChange, getActiveTab } from "./api/browser-api";
import { getCurrentPlayingSongFromTab, getCurrentViewSongsFromTab } from "./api/content-scripts-api";
import "./Popup.scss";
const logo = require("../assets/img/logo.svg");

const Popup = () => {
    useEffect(() => {
        getActiveTab().then((tab) => {
            getCurrentPlayingSongFromTab(tab.id!).then(console.log);
            getCurrentViewSongsFromTab(tab.id!).then(console.log);
        });

        return subscribeToActiveTabUrlChange((tabId) => {
            getCurrentPlayingSongFromTab(tabId).then(console.log);
            getCurrentViewSongsFromTab(tabId).then(console.log);
        });
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/Popup/Popup.js</code> and save to reload.
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
            </header>
        </div>
    );
};

export default Popup;
