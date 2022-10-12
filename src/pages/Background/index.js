console.log('This is the background page.');
console.log('Put the background scripts here.');

const database = [];

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extension");

    database.push(request.greeting);
    if (request.greeting === "hello")
      sendResponse({ farewell: "goodbye" });
  }
);
