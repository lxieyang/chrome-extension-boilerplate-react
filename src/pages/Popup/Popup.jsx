import React, { useEffect } from 'react';

const Popup = () => {

  useEffect(() => {
    setupStream()
    return () => {
    }
  }, [])


  const setupStream = async => {
    navigator.mediaDevices.getUserMedia({
      video: true
    }).then(stream => {
      debugger
      console.log('stream is:', stream);
      document.querySelector('#webcamVideo').srcObject = stream;
      // document.querySelector('#status').innerHTML =
      //   'Webcam access granted for extension, please close this tab';
      // chrome.storage.local.set({
      //   'camAccess': true
      // }, () => {});
    })
      .catch(err => {
        // document.querySelector('#status').innerHTML =
        //   'Error getting webcam access for extension: ' + err.toString();
        console.error(err);
      });
  }

  return (
    <div>
      <div>
        in the popup
      </div>
      <div>
        <video autoPlay={true} id="webcamVideo" width="227px" height="227px"></video>
      </div>
    </div>


  );
};

export default Popup;
