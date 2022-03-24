import React from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';
import './Popup.scss';

const Popup = () => {
  return (
    <div className="App">
      <header className="header">
        <h1 className="header__title">Hyper Pop</h1>
      </header>
      <input
        type="file"
        id="avatar"
        name="avatar"
        accept="image/png, image/jpeg"
      />
      <button>Auto Populate</button>
    </div>
  );
};

export default Popup;
