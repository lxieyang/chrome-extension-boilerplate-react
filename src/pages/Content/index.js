import { printLine } from './modules/print';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');



printLine("Using the 'printLine' function from the Print Module");

chrome.runtime.onMessage.addListener(messageReceived);

function messageReceived(msg, sender, sendResponse) {
    console.log('inside the CONTENT paghe', msg, sender, sendResponse)
    return sendResponse({ farewell: "goodbye" });
}

