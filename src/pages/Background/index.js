// import axios from 'axios';

console.log('This is the background page.');

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    console.log('Tab finished loading, testing HTTP request', tabId, tab);
    // do your things
    fetch('https://localshot:3000', {
      method: 'POST',
      body: JSON.stringify({ url: 'https://localhost/' }),
    })
      .then((response) => response.json())
      .catch((e) => console.log(e))
      .then((data) => console.log(data));
  }
});

console.log('Put the background scripts here...');
