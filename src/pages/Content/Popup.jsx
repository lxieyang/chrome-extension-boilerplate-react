import React, { useEffect } from 'react';
import './Popup.css';


const Popup = () => {
  const [userInput, setUserInput] = React.useState('Enter prompt here');
  const [apiKey, setApiKey] = React.useState(null);
  const [result, setResult] = React.useState('Result will appear here');
  function updateInputValue(evt) {
    setUserInput(evt.target.value);
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

  async function addNote() {
    const response = await fetch("http://localhost:8765", {
        method: "POST",
        // set cors
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            action: "addNote",
            version: 6,
            params: {
                note: {
                    deckName: "Default",
                    modelName: "Basic",
                    fields: {
                        Front: "Testing Anki Chrome Extension",
                        Back: "Back content",
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
    const data = await response.json()
    console.error(data)
    if (data.error) {
        throw new Error(data.error)
    }
    return data.result
}


  let apiKeyMessage = null;
  if (apiKey === null || apiKey === undefined || apiKey === '') {
    apiKeyMessage = <h1>You need to set the API key</h1>
  }
  

  return (
    <div className="App">
      <header className="App-header">
        <textarea onChange={updateInputValue} value={userInput}/>
        <textarea value={result}/>
        <button onClick={callGPT3}>Generate Result</button>
        <button onClick={addNote}>Add Card</button>
        {apiKeyMessage}
      </header>
    </div>
  );
};

export default Popup;
