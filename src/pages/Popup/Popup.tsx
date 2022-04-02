import React, { useState } from 'react';
import logo from '../../assets/img/logo.svg';
import './Popup.css';

export const Popup = () => {
  const [clicks, setClicks] = useState(0);
  const handleClick = () => setClicks(clicks + 1);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/pages/Popup/Popup.tsx</code> and save to reload.
        </p>
        <p>{clicks}</p>
        <button onClick={handleClick}>Click me!</button>
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
