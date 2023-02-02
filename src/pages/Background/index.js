chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("Received message from content script")
    if (request.action === "openOptionsPage") {
      console.log("Received request to open options page")
      chrome.runtime.openOptionsPage();
    }
  });