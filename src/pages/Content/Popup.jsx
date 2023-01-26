import React, { useEffect } from 'react';
import logo from '../../assets/img/logo.svg';
import './Popup.css';


const Popup = () => {
  const [userInput, setUserInput] = React.useState('Enter prompt here');
  const [apiKey, setApiKey] = React.useState(null);
  const [result, setResult] = React.useState('Result will appear here');
  function updateInputValue(evt) {
    setUserInput(evt.target.value);
  }
  function updateApiKey(evt) {
    setApiKey(evt.target.value);
  }

  useEffect(() => {
    chrome.storage.sync.get(['apiKey'], function(result) {
      setApiKey(result.apiKey);
    });
  }, []);

  async function callGPT3() {
    // Call GPT3 with userInput
    const url = `https://api.openai.com/v1/completions`;
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: userInput,
            temperature:0.5
        })
    };


    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);
    const result = json.choices[0].text;
    setResult(result);
  }


  let apiKeyMessage = null;
  if (apiKey === null || apiKey === undefined || apiKey === '') {
    apiKeyMessage = <h1>You need to set the API key</h1>
  }
  

  return (
    <div className="App">
      <header className="App-header">
        <textarea onChange={updateApiKey} value={apiKey}/>
        <textarea onChange={updateInputValue} value={userInput}/>
        <textarea value={result}/>
        <button onClick={callGPT3}></button>
        {apiKeyMessage}
      </header>
    </div>
  );
};

export default Popup;
