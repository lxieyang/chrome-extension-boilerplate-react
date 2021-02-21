import React, { useEffect, useState } from 'react';


let streamRef = null
const Popup = () => {

  // const [stream, setStream] = useState(null)
  useEffect(() => {
    // constructor
    // setupStream()
    return () => {
    }
  }, [])





  const requestCreateStream = _ => {
    navigator.mediaDevices.getUserMedia({
      video: true
    })
      .then(stream => {
        debugger
        streamRef = stream
        console.log('stream is on in popup:', stream);
        document.querySelector('#webcamVideo').srcObject = stream;

      })
      .catch(err => {
        console.error(err);
      });


    chrome.runtime.sendMessage({ type: 'start-stream' },
      (response) => {

        // document.querySelector('#webcamVideo').srcObject = response.stream;
        console.log('content type response', response.response)
        return true
      })
  }

  const requestDestroyStream = _ => {
    streamRef.getTracks().forEach(function (track) {
      if (track.readyState === 'live' && track.kind === 'video') {
          track.stop();
      }
    })
    chrome.runtime.sendMessage({ type: 'stop-stream' },
      (response) => {
        console.log('content type response', response.response)
        return true
      })
  }



  return (
    <div>
      <div>
        in the popup
      </div>
      <div className="buttons-container">
        <button id="openStream" onClick={requestCreateStream} >Open stream </button>
        <button id="closeStream" onClick={requestDestroyStream} >Close stream</button>
      </div>
      <div>
        <video autoPlay={true} id="webcamVideo" width="227px" height="227px"></video>
      </div>
    </div>


  );
};

export default Popup;
