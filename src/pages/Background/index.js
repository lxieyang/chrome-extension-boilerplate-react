console.log('This is the background page.');
console.log('Put the background scripts here.');


chrome.runtime.onMessage.addListener(messageReceived);

function messageReceived(msg, sender, sendResponse) {
    console.log('inside the background paghe', msg, sender, sendResponse)
    return sendResponse({ farewell: "goodbye" });

}