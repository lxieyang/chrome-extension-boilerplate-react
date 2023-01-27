import React from 'react';
import { createRoot } from 'react-dom/client';

import Popup from './Popup';
import './index.css';


chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "popup"});
});
const container = document.getElementById('app-container');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Popup />);
