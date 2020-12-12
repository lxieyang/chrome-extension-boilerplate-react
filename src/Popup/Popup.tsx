import React, { useEffect } from "react";
import { MessageAction, StreamingServiceSong } from "../shared/shared.model";
import "./Popup.scss";
const logo = require("../assets/img/logo.svg");

const Popup = () => {
    useEffect(() => {
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            const activeTab = tabs[0];

            chrome.tabs.sendMessage(activeTab.id!, { action: MessageAction.GetCurrentPlayingSong }, (song: StreamingServiceSong) => {
                console.log({ song });
            });

            chrome.tabs.sendMessage(activeTab.id!, { action: MessageAction.GetCurrentViewSongs }, (songs: StreamingServiceSong[]) => {
                console.log({ songs });
            });
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
