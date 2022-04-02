import { printLine } from './modules/print';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

// printLine("Using the 'printLine'");
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    console.log('Complete', tabId, tab);
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
