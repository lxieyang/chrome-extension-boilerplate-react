import '../../assets/img/icon-34.png';
import '../../assets/img/icon-128.png';

console.log('This is the background page.');
console.log('Put the background scripts here.');
chrome.tabs.create({ url: "chrome://newtab" })



let streamRef = null
const setupStream = async _ => {
    navigator.mediaDevices.getUserMedia({
        video: true
    }).then(stream => {
        streamRef = stream
        debugger
        console.log('stream is:', stream);
        // document.querySelector('#webcamVideo').srcObject = stream;

    })
        .catch(err => {
            console.error(err);
        });
}

const stopVideoOnly = () => {
    streamRef.getTracks().forEach(function (track) {
        if (track.readyState === 'live' && track.kind === 'video') {
            track.stop();
        }
    });
}

const initialize = _ => {
    navigator.mediaDevices.getUserMedia({
        video: true
    }).then(stream => {
        streamRef = stream
        stopVideoOnly()

    })
        .catch(err => {
            console.error(err);
        });
}

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    // Arbitrary string allowing the background to distinguish
    // message types. You might also be able to determine this
    // from the `sender`.

    switch (message.type) {
        case 'start-stream':
            await setupStream()
            sendResponse({ stream: streamRef, response: 'stream-started' })
            break

        case 'stop-stream':
            await stopVideoOnly()
            sendResponse({ response: 'stream-ended' })

            break

        default:
            break;
    }
    return true

})


initialize()



