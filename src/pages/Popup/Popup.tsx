import axios from 'axios';
import React, { useEffect } from 'react';
import logo from '../../assets/img/logo.svg';
import { Greetings } from '../../containers/Greetings/Greetings';
import './Popup.css';

export const Popup = () => {
  const handleClick = () =>
    fetch('https://localshot:3000', {
      method: 'POST',
      body: JSON.stringify({ url: 'https://localhost/' }),
    })
      .then((response) => response.json())
      .catch((e) => console.log(e))
      .then((data) => console.log(data));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/pages/Popup/Popup.jsx</code> and save to reload.
          <button onClick={handleClick}>Test</button>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React!
        </a>
      </header>
    </div>
  );
};
