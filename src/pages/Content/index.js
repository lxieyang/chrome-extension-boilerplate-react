const getId = () => {
  let strong = 1000;
  return (
    new Date().getTime().toString(16) +
    Math.floor(strong * Math.random()).toString(16)
  );
};

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'TWEET') {
    window.open(
      `https://twitter.com/intent/tweet?text=${msg.url}`,
      't',
      'width=600,height=300'
    );
  }
  if (msg.type === 'CAPTURE') {
    const video = document.querySelector('video');
    if (!video) return;
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', video.videoWidth);
    canvas.setAttribute('height', video.videoHeight);
    canvas
      .getContext('2d')
      .drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    const dataUrl = canvas.toDataURL();
    const time = parseInt(video.currentTime);
    const id = getId();
    const title = document.title;

    // Youtube Special Support
    if (location.href.startsWith('https://www.youtube.com/')) {
      const videoId = document
        .querySelector('ytd-watch-flexy')
        .getAttribute('video-id');
      const url = `https://www.youtube.com/watch?v=${videoId}&t=${time}s`;
      chrome.runtime.sendMessage({
        dataUrl,
        time,
        url,
        title,
        id,
        type: 'res',
      });
    } else {
      const url = location.href;
      chrome.runtime.sendMessage({
        dataUrl,
        time,
        url,
        title,
        id,
        type: 'res',
      });
    }
  }
  if (msg.type === 'SUBS') {
    const video = document.querySelector('video');
    const { x, y, width, height } = video.getBoundingClientRect();
    const time = parseInt(video.currentTime);
    const id = getId();
    const title = document.title;
    const url = location.href;

    chrome.runtime.sendMessage({
      type: 'rect',
      x,
      y,
      width,
      height,
      time,
      id,
      title,
      url,
    });
  }
  if (msg.type === 'JUMP') {
    window.open(msg.href);
  }
  if (msg.type === 'REMOTETWEET') {
    const { imageId, body } = msg;
    const payload = JSON.stringify({ body, type: 'image' });
    const csrf = document
      .querySelector("meta[name='csrf-token']")
      .getAttribute('content');
    const headers = {
      'content-type': 'application/json',
      accept: 'application/json',
      'x-csrf-token': csrf,
    };
    fetch(`/api/internal/images/${imageId}/tweets`, {
      method: 'POST',
      body: payload,
      headers,
    });
  }
  return true;
});
