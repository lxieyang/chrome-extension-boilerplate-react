// import axios from 'axios';

console.log('This is the background page.');

// Example for listening to tab switching/loading
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    console.log('Tab finished loading', tabId, tab);
    // do your things
  }
});

console.log('Put the background scripts here...');
