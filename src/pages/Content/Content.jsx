import React, { useEffect } from 'react';
import './Content.css';


const Content = () => {
  const [userInput, setUserInput] = React.useState('Enter prompt here');
  const [apiKey, setApiKey] = React.useState(null);
  const [ankiKey, setAnkiKey] = React.useState(null);
  const [result, setResult] = React.useState('Result will appear here');
  const [isHttps, setIsHttps] = React.useState(true);
  function updateInputValue(evt) {
    setUserInput(evt.target.value);
  }

  useEffect(() => {
    // Get API key and anki key from storage
    chrome.storage.sync.get({
      apiKey: '',
      ankiKey: '',
    }, function(items) {
      setApiKey(items.apiKey);
      setAnkiKey(items.ankiKey);
    });
    // Check if page is https
    if (window.location.protocol !== "https:") {
      setIsHttps(false);
    }
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

  async function addNote() {
    await fetch("http://localhost:8765", {
        method: "POST",
        // set cors
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            action: "addNote",
            version: 6,
            key: ankiKey,
            params: {
                note: {
                    deckName: "Default",
                    modelName: "Basic",
                    fields: {
                        Front: "Created from browser",
                        Back: "mine",
                    },
                    options: {
                        allowDuplicate: false,
                        duplicateScope: "deck",
                        duplicateScopeOptions: {
                            deckName: "Default",
                            checkChildren: false,
                        },
                      },
                    },
                  },
        }),
    });
    return;
}


  let apiKeyMessage = null;
  if (apiKey === null || apiKey === undefined || apiKey === '') {
    apiKeyMessage = <h1>You need to set the Open AI API key</h1>
  }

  let ankiKeyMessage = null;
  if (ankiKey === null || ankiKey === undefined || ankiKey === '') {
    ankiKeyMessage = <h1>You need to set the Anki API key</h1>
  }
  

  return (
    <div className="Initial">
    <div className="App">
        {isHttps && (<div style={{display: "flex", flexDirection: "column"}}>
          <textarea onChange={updateInputValue} value={userInput}/>
          <textarea value={result}/>
          <button onClick={callGPT3}>Generate Result</button>
          <button onClick={addNote}>Add Card</button>
          {apiKeyMessage}
          {ankiKeyMessage}
        </div>)}
        {!isHttps && (<h1>HTTPS is required for this extension to work</h1>)}
    </div>
    </div>
  );
};

export default Content;
