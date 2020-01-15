import '../../assets/img/icon-34.png';
import '../../assets/img/icon-128.png';

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'res') {
  }
  return true;
});
