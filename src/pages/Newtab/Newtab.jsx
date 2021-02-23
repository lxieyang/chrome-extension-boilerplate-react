import React, { useEffect } from 'react';
import logo from '../../assets/img/logo.svg';
import './Newtab.css';
import './Newtab.scss';

const Newtab = () => {



  const setupStream = _ => {
    navigator.mediaDevices.getUserMedia({
      video: true
    }).then(stream => {
      stopVideoOnly(stream)
      console.log('stream is:', stream);
      /* Save  */
      // document.querySelector('#status').innerHTML =
      //   'Webcam access granted for extension, please close this tab';
      chrome.storage.local.set({
        'camAccess': true
      }, () => { });
    })
      .catch(err => {
        // document.querySelector('#status').innerHTML =
        //   'Error getting webcam access for extension: ' + err.toString();
        console.error(err);
      });
  }

  // stop only camera
  const stopVideoOnly = (stream) => {
    stream.getTracks().forEach(function (track) {
      if (track.readyState == 'live' && track.kind === 'video') {
        track.stop();
      }
    });
  }


  useEffect(() => {
    console.log('inside newTab ctor')
    setupStream()


    return () => {

    }
  }, [])

  return (
    <div>
      I'm NewTab, Nevo Sayag
    </div>
  );
};

export default Newtab;
