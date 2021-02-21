import React, { useEffect, useState } from 'react';

const Popup = () => {

  const [stream, setStream] = useState(null)
  useEffect(() => {
    // constructor
    setupStream()
    return () => {
    }
  }, [])


  const setupStream = async => {
    navigator.mediaDevices.getUserMedia({
      video: true
    }).then(stream => {
      setStream(stream)
      debugger
      console.log('stream is:', stream);
      document.querySelector('#webcamVideo').srcObject = stream;

    })
      .catch(err => {
        console.error(err);
      });
  }

  const stopVideoOnly = () => {
    stream.getTracks().forEach(function (track) {
      if (track.readyState === 'live' && track.kind === 'video') {
        track.stop();
      }
    });
  }

  return (
    <div>
      <div>
        in the popup
      </div>
      <div className="buttons-container">
        <button id="openStream" onClick={setupStream} >Open stream </button>
        <button id="closeStream" onClick={stopVideoOnly} >Close stream</button>
      </div>
      <div>
        <video autoPlay={true} id="webcamVideo" width="227px" height="227px"></video>
      </div>
    </div>


  );
};

export default Popup;
