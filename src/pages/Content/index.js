console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

const getId = () => {
  let strong = 1000;
  return new Date().getTime().toString(16) + Math.floor(strong * Math.random()).toString(16)
}


chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'CAPTURE') {
    const video = document.querySelector('video');
    if (!video) return;
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', video.videoWidth);
    canvas.setAttribute('height', video.videoHeight);
    canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    const dataUrl = canvas.toDataURL();
    const time = parseInt(video.currentTime);
    const id = getId()
    const title = document.title;
    const url = location.href;
    if (msg.times && url.startsWith("https://www.youtube.com/")) {
      const seconds = video.seconds;
      url + "&t=" + seconds + "s";
    }
    chrome.runtime.sendMessage({ dataUrl, time, url, title, id, type: 'res' })
  }
  if (msg.type === 'SUBS') {
    const video = document.querySelector('video');
    const { x, y, width, height } = video.getBoundingClientRect();
    const time = parseInt(video.currentTime);
    const id = getId()
    const title = document.title;
    const url = location.href;

    chrome.runtime.sendMessage({ type: 'rect', x, y, width, height, time, id, title, url });
  }
  if (msg.type === 'JUMP') {
    window.open(msg.href);
  }
  return true;
})