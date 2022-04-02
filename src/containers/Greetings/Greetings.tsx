import axios from 'axios';
import React, { useEffect } from 'react';
import icon from '../../assets/img/icon-128.png';

export const Greetings = () => {
  const state = {
    name: 'dev',
  };

  useEffect(() => {
    async function loadURL() {
      const res = await axios.get(`http://localhost:3000/`);
      console.log('res', res);
    }
    loadURL();
  });

  return (
    <div>
      <p>Hello, {state.name}!</p>
      <img src={icon} alt="extension icon" />
    </div>
  );
};
