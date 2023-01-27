import React, { useEffect } from 'react';
import './Options.css';

const Options: React.FC = () => {
  const [apiKey, setApiKey] = React.useState<string>('');
  const [ankiKey, setAnkiKey] = React.useState<string>('');
  // Load saved keys, if they exists.
  useEffect(() => {
    chrome.storage.sync.get({
      apiKey: '',
      ankiKey: '',
    }, function(items) {
      setApiKey(items.apiKey);
      setAnkiKey(items.ankiKey);
    });
  }, []);

  function handleApiKeyChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setApiKey(event.target.value);
  }

  function handleAnkiKeyChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setAnkiKey(event.target.value);
  }

  function handleSaveClick() {
    chrome.storage.sync.set({
      apiKey: apiKey,
    }, function() {
      // Update status to let user know options were saved.
      const realApiKey = apiKey;
      setApiKey('Options saved');
      setTimeout(function() {
        setApiKey(realApiKey);
      }, 750);
    })
  }

  function unsetApiKey() {
    chrome.storage.sync.set({
      apiKey: '',
    }, function() {
      // Update status to let user know options were saved.
      setApiKey('Options saved');
      setTimeout(function() {
        setApiKey('');
      }, 750);
    })
  }

  function handleAnkiSaveClick() {
    chrome.storage.sync.set({
      ankiKey: ankiKey,
    }, function() {
      // Update status to let user know options were saved.
      const realAnkiKey = ankiKey;
      setAnkiKey('Options saved');
      setTimeout(function() {
        setAnkiKey(realAnkiKey);
      }, 750);
    })
  }

  function unsetAnkiKey() {
    chrome.storage.sync.set({
      ankiKey: '',
    }, function() {
      // Update status to let user know options were saved.
      setAnkiKey('Options saved');
      setTimeout(function() {
        setAnkiKey('');
      }, 750);
    })
  }
  


  return <div className="OptionsContainer">
    <h1>Set OpenAI API key</h1>
    <textarea value={apiKey} onChange={handleApiKeyChange}></textarea>
    <button onClick={handleSaveClick}>Save</button>
    <button onClick={unsetApiKey}>Unset</button>
    <h1>Set Anki API key</h1>
    <textarea value={ankiKey} onChange={handleAnkiKeyChange}></textarea>
    <button onClick={handleAnkiSaveClick}>Save</button>
    <button onClick={unsetAnkiKey}>Unset</button>
  </div>;
};

export default Options;
