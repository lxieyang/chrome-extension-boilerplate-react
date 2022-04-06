console.log('This is the background page.');
console.log('Put the background scripts here.');

chrome.runtime.onMessage.addListener((message,sender)=>{
    console.log('background message: ', message);
    console.log('background sender: ', sender);
})