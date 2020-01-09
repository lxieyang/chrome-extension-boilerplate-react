import '../../assets/img/icon-34.png';
import '../../assets/img/icon-128.png';

console.log('This is the background page.');
console.log('Put the background scripts here.');

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'res') {
    console.log(msg);
  }
  return true;
})