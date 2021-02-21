import React, { useEffect, useState } from 'react';

const Popup = () => {

  // const [stream, setStream] = useState(null)
  useEffect(() => {
    // constructor
    // setupStream()
    return () => {
    }
  }, [])





  const requestCreateStream = _ => {
    chrome.runtime.sendMessage({ type: 'start-stream' },
      (response) => {

        document.querySelector('#webcamVideo').srcObject = response.stream;
        console.log('content type response', response.response)
        return true
      })
  }

  const requestDestroyStream = _ => {
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
