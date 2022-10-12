import React from 'react';
import logo from '../../assets/img/logo.svg';
import './Popup.css';
import { Text } from '@chakra-ui/react'

const Popup = () => {
  const [name, setName] = React.useState('');
  const handleClick = () => {
    console.log('handleClick', name);
    // chrome.runtime.sendMessage({ name }, function (response) {
    //   console.log(response.farewell);
    // });
    chrome.runtime.sendMessage({
      type: "notification", options: {
        type: "basic",
        iconUrl: chrome.extension.getURL("icon128.png"),
        title: "Test",
        message: "Test"
      }
    });
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Text fontSize='10px' color='white'>
          Edit <code>src/pages/Popup/Popup.js</code> and save to reload.
        </Text>
        <Text fontSize='20px' color='tomato'>
          PLANES
        </Text>

        <input value={name} onChange={e => setName(e.target.value)} />
        <button onClick={handleClick}>Click me</button>
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

export default Popup;
