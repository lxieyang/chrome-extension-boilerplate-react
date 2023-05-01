/*global chrome*/

chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  if (
    request.message === 'profitability_modal' ||
    request.message === 'review_modal'
  ) {
    // console.log(3, request.message);
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      // await new Promise(resolve => setTimeout(resolve, 1000));
      // console.log(2, tabs[0].id);
      chrome.tabs.sendMessage(tabs[0].id, {
        type: request.message,
      });
    });
  }
});
