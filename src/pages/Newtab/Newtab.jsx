import React, { useEffect } from 'react';
import logo from '../../assets/img/logo.svg';
import './Newtab.css';
import './Newtab.scss';

const Newtab = () => {

  const setupStream = async _ => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      stopStream(stream)
      chrome.storage.local.set({
        'camAccess': true
      }, () => { });
    }

    catch (err) {
      console.error('error while setupStream', err);
    }
  }

  const stopStream = (stream) => {
    stream.getTracks().forEach(function (track) {
      if (track.kind === 'video') {
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
      Please grant the Camera permission
    </div>
  );
};

export default Newtab;
