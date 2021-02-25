import '../../assets/img/icon-34.png';
import '../../assets/img/icon-128.png';
import ml5 from 'ml5'

console.log('This is the background page.')


let poseNet = null
let videoElm = null
let poseNetInterval = null
let streamRef = null

const poseNet_options = {
    input_resolution: 720,
    outputStride: 16,
    maxPoseDetections: 2,
    multiplier: 0.50,
    detectionType: 'multiple'
}

const isCameraPermissionGranted = _ => {
    try {
        chrome.storage.local.get('camAccess', items => {
            if (!!items['camAccess']) {
                console.log('cam access already exists');
                return true
            }
            else {
                console.log("new tab open")
                return false
            }
        });
    }
    catch (err) {
        console.log('error while getting data from storage: camAccess', err)
        return null
    }
}

const openNewTab = _ => {

    const newTab = chrome.runtime.getURL('Newtab.html')
    chrome.tabs.create(
        {
            url: newTab,
            active: true
        },
        data => {
            console.log(data)
        }
    )
}

const setupStream = async _ => {
    navigator.mediaDevices.getUserMedia({
        video: true
    }).then(stream => {
        streamRef = stream
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
        if (track.kind === 'video') {
            track.stop();
        }
    });
}

const startReceivingPoses = _ => {

    if (!streamRef) {
        return
    }
    poseNetInterval = setInterval(async () => {
        try {
            const poses = await poseNet.multiPose(videoElm)
            chrome.runtime.sendMessage({ type: 'posenet-state',  data: poses},
            (response) => {
                console.log('content type response', response.response)
                return true
            })
            console.log('results is:', poses);
        }

        catch (err) {
            console.log('error while getting poses', err);
        }
    }, 1000);

}

const stopReceivingPoses = _ => {
    clearInterval(poseNetInterval)
}

const setupPosesLibrary = _ => {
    poseNet = ml5.poseNet(startReceivingPoses.bind(this), poseNet_options)
}

const setupListeners = _ => {
    chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
        switch (message.type) {
            case 'start-stream':
                await setupStream()
                startReceivingPoses()
                sendResponse({ stream: streamRef, response: 'stream-started' })
                break

            case 'stop-stream':
                await stopVideoOnly()
                stopReceivingPoses()
                sendResponse({ response: 'stream-ended' })

                break

            default:
                break;
        }
        return true

    })
}


const init = _ => {
    setupListeners()
    setupPosesLibrary()
    if (!isCameraPermissionGranted()) {
        openNewTab()
    }
}


init()



