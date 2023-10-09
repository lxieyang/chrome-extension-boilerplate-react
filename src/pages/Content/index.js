import {printLine} from './modules/print';
import {createRoot} from "react-dom/client";
import React from "react";
import RangeHeader from "../../DateRangeContent/RangeHeader";
import {CONTENT_LOADED, contentDataStream, dataStream, sendData} from "../../util/messages";
import {messages} from '@extend-chrome/messages'


console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");


let element;
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     console.log(message)
//     debugger;
// // return true <- this and the callback in background.js are what caused a crash in extensions page of my Google chrome
// });




let interval = setInterval(() => {
    element = document.querySelector("#etf-about-header");
    if (element) {
        // chrome.runtime.onMessage.addListener(
        //     function(request, sender, sendResponse) {
        //         console.log(sender.tab ?
        //             "from a content script:" + sender.tab.url :
        //             "from the extension");
        //         if (request.greeting === "hello")
        //             sendResponse({farewell: "goodbye"});
        //     }
        // );

        const root = createRoot(element); // createRoot(container!) if you use TypeScript
        root.render(<RangeHeader/>);
        clearInterval(interval);

    }
}, 1000);
