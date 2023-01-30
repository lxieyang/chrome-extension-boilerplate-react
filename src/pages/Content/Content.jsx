import React, { useEffect } from 'react';
import './Content.css';

const promptTemplate = "You are an intelligent summarization bot that splits text passages into questions and answers for use in Anki spaced repetition cards.\n\nText: Dogs chase cats because they are hungry.\nQuestion: Why do dogs chase cats?\nAnswer: Because they are hungry\n\nText: {}"


function updateOnChange(setter) {
  return (e) => {
    setter(e.target.value);
  }
}

const Content = () => {
  const [apiKey, setApiKey] = React.useState(null);
  const [ankiKey, setAnkiKey] = React.useState(null);
  const [ankiDeck, setAnkiDeck] = React.useState(null);
  const [question, setQuestion] = React.useState('Question will appear here');
  const [answer, setAnswer] = React.useState('Answer will appear here');
  const [isHttps, setIsHttps] = React.useState(true);
  const [isVisible, setIsVisible] = React.useState(false);
  const [selectedText, setSelectedText] = React.useState("");

  useEffect(() => {
    // Get API key and anki key from storage
    chrome.storage.sync.get({
      apiKey: '',
      ankiKey: '',
      ankiDeck: '',
    }, function(items) {
      setApiKey(items.apiKey);
      setAnkiKey(items.ankiKey);
      setAnkiDeck(items.ankiDeck);
    });
    // Check if page is https
    if (window.location.protocol !== "https:") {
      setIsHttps(false);
    }
    // Add listener for the popup and options events
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        console.log(request)
        console.log(sender)
        if (request.message === "popup") {
          console.log("receieved popup message")
          setIsVisible((isVisible) => !isVisible); // needed due to variable scoping reasons? seems like it gets fixed at initial value
        }
        if (request.message === "options") {
          console.log("Received new options settings");
          chrome.storage.sync.get({
            apiKey: '',
            ankiKey: '',
            ankiDeck: '',
          }, function(items) {
            setApiKey(items.apiKey);
            setAnkiKey(items.ankiKey);
            setAnkiDeck(items.ankiDeck);
          });
        }
        console.log("received message");
      }
    );
   // Add listener for the selection event
   document.addEventListener("selectionchange", function() {
    var selection = window.getSelection().toString();
    setSelectedText(selection);
    if (selection !== "") {
      setIsVisible(true);
    }
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
            prompt: promptTemplate.replace('{}', selectedText),
            temperature:0.5,
            max_tokens: 100,
        })
    };
    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);
    const result = json.choices[0].text;
    // Question is everything after Question: and before Answer:
    const question = result.substring(result.indexOf("Question: ") + 10, result.indexOf("Answer: "));
    setQuestion(question);
    // Answer is everything after Answer:
    const answer = result.substring(result.indexOf("Answer: ") + 8);
    setAnswer(answer);
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
                    deckName: ankiDeck,
                    modelName: "Basic",
                    fields: {
                        Front: question,
                        Back: answer,
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

  async function openOptions() {
    await chrome.runtime.sendMessage({ action: "openOptionsPage" });
  }

  let apiKeyMessage = null;
  if (apiKey === null || apiKey === undefined || apiKey === '') {
    apiKeyMessage = <h1><button onClick={openOptions}>You need to set the Open AI API key</button></h1>
  }

  let ankiKeyMessage = null;
  if (ankiKey === null || ankiKey === undefined || ankiKey === '') {
    ankiKeyMessage = <h1><button onClick={openOptions}>You need to set the Anki API key</button></h1>
  }

  let ankiDeckMessage = null;
  if (ankiDeck === null || ankiDeck === undefined || ankiDeck === '') {
    ankiDeckMessage = <h1><button onClick={openOptions}>You need to set the Anki deck</button></h1>
  }
  

  return (
    <div className="Initial">
    <div style={{visibility: isVisible ? "visible" : "hidden"}}>
    <div className="App">
        {isHttps && (<div style={{display: "flex", flexDirection: "column"}}>
          <textarea value={question} onChange={updateOnChange(setQuestion)}/>
          <textarea value={answer} onChange={updateOnChange(setAnswer)}/>
          <textarea value={selectedText}/>
          <button onClick={callGPT3}>Generate Result</button>
          <button onClick={addNote}>Add Card</button>
          {apiKeyMessage}
          {ankiKeyMessage}
          {ankiDeckMessage}
        </div>)}
        {!isHttps && (<h1>HTTPS is required for this extension to work</h1>)}
    </div>        
    </div>
    </div>
  );
};

export default Content;
