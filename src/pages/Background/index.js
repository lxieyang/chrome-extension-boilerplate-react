import '../../assets/img/icon-34.png';
import '../../assets/img/icon-128.png';
import ml5 from 'ml5'

console.log('This is the background page.');
console.log('Put the background scripts here.');
try {
    chrome.storage.local.get('camAccess', items => {
    if (!!items['camAccess']) {
      console.log('cam access already exists');
    }
    else{
        console.log("NewTAB opeeen")
        chrome.tabs.create({ url: "chrome://newtab" })
    }
  });
}
catch(err){
    console.log("NewTAB opeeen2")
    chrome.tabs.create({ url: "chrome://newtab" })
    console.log(err)
}


let poseNet = null
let videoElm = null
const poseNet_options = {
    input_resolution: 720,
    outputStride: 16,
    maxPoseDetections: 2,
    multiplier: 0.50,
    detectionType: 'multiple'
}

let streamRef = null
const setupStream = async _ => {
    navigator.mediaDevices.getUserMedia({
        video: true
    }).then(stream => {
        streamRef = stream
        debugger
        console.log('stream is:', stream);
        videoElm = document.querySelector('#webcamVideoBg')
        videoElm.srcObject = stream;

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

const poseNetInitialized = _ => {

    setInterval(() => {
        poseNet.multiPose(videoElm)
            .then((results) => {
                console.log('results is:', results);
            })

            .catch(err => {
                console.log('error while getting poses', err);
            })


    }, 1000);

}
const setupLibrary = _ => {
    poseNet = ml5.poseNet(poseNetInitialized.bind(this), poseNet_options)

}

const initialize = _ => {
    navigator.mediaDevices.getUserMedia({
        video: true
    }).then(stream => {
        streamRef = stream
        stopVideoOnly()
        setupLibrary()

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



