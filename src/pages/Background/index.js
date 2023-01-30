chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "openOptionsPage") {
      chrome.runtime.openOptionsPage();
    }
  });