import React, { useEffect } from 'react';
import './Options.css';

const Options: React.FC = () => {
  const [apiKey, setApiKey] = React.useState<string>('');
  // Load saved key, if it exists.
  useEffect(() => {
    chrome.storage.sync.get({
      apiKey: '',
    }, function(items) {
      setApiKey(items.apiKey);
    });
  }, []);

  function handleApiKeyChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setApiKey(event.target.value);
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
  


  return <div className="OptionsContainer">
    <h1>Set OpenAI API key</h1>
    <textarea value={apiKey} onChange={handleApiKeyChange}></textarea>
    <button onClick={handleSaveClick}>Save</button>
    <button onClick={unsetApiKey}>Unset</button>
  </div>;
};

export default Options;
