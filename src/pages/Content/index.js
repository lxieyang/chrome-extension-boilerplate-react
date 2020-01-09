console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

const getId = ()=>{
  let strong = 1000;
  return new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16)
 }


chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'CAPTURE') {
    const video = document.querySelector('video');
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', video.videoWidth);
    canvas.setAttribute('height', video.videoHeight);
    canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    const dataUrl = canvas.toDataURL();
    const time = parseInt(video.currentTime);
    const id = getId()
    const url = location.href;
    const title = document.title;
    chrome.runtime.sendMessage({dataUrl, time, url, title, id, type: 'res'})
  }
  if (msg.type === 'JUMP') {
    location.href = msg.href;
  }
  return true;
})