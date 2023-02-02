import React, { useEffect } from 'react';

const promptTemplate = "You are an intelligent summarization bot that splits text passages into questions and answers for use in Anki spaced repetition cards. The question and answer will total less than {words} words.\n\nText: Dogs chase cats because they are hungry.\nQuestion: Why do dogs chase cats?\nAnswer: Because they are hungry\n\nText: {selectedText}"

const spinnerIcon = <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
</svg>


function updateOnChange(setter) {
  return (e) => {
    setter(e.target.value);
  }
}

export interface ContentProps {
  setVisible: (isVisible: boolean) => void;
  storage: {
    get: (keys: string | string[] | { [key: string]: any } | null, callback: (items: { [key: string]: any }) => void) => void;
    set: (items: { [key: string]: any }, callback?: () => void) => void
  },
  runtime: {
    onMessage: {
      addListener: (callback: (message: any, sender: any, sendResponse: any) => void) => void
    },
    sendMessage: (message: any, callback?: (response: any) => void) => void
  },
  // for UI testing
  ignoreHttp?: boolean
}

const Content = ({ setVisible, storage, runtime, ignoreHttp }: ContentProps) => {
  const [apiKey, setApiKey] = React.useState(null);
  const [ankiKey, setAnkiKey] = React.useState(null);
  const [ankiDeck, setAnkiDeck] = React.useState(null);
  const [question, setQuestion] = React.useState('');
  const [answer, setAnswer] = React.useState('');
  const [isHttps, setIsHttps] = React.useState(true);
  const [selectedText, setSelectedText] = React.useState("");
  const [words, setWords] = React.useState(50);
  const [callingOpenAi, setCallingOpenAi] = React.useState(false);
  const [callingAnki, setCallingAnki] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [canPressGenerate, setCanPressGenerate] = React.useState(true);
  const [canPressAdd, setCanPressAdd] = React.useState(true);

  // Define here so we can delete the listener
  function selectionChange() {
    const selection = window.getSelection().toString();
    if (selection !== "" && selection!== selectedText) {
      setVisible(true);
    }
    setSelectedText(selection);
  }

  useEffect(() => {
    // Get API key and anki key from storage
    storage.get({
      apiKey: '',
      ankiKey: '',
      ankiDeck: '',
    }, function (items) {
      setApiKey(items.apiKey);
      setAnkiKey(items.ankiKey);
      setAnkiDeck(items.ankiDeck);
      console.log("setting can press generate")
      setCanPressAdd(!(items.apiKey === null || items.apiKey === undefined || items.apiKey === ''))
      setCanPressGenerate(!(items.ankiKey === null || items.ankiKey === undefined || items.ankiKey === '') && !(items.ankiDeck === null || items.ankiDeck === undefined || items.ankiDeck === ''))
    });
    // Check if page is https
    if (window.location.protocol !== "https:" && !ignoreHttp) {
      setIsHttps(false);
    }
    // Add listener for the popup and options events
    runtime.onMessage.addListener(
      function (request, sender, sendResponse) {
        console.log(request)
        console.log(sender)
        if (request.message === "popup") {
          console.log("receieved popup message")
          setVisible((isVisible) => !isVisible); // needed due to variable scoping reasons? seems like it gets fixed at initial value
        }
        if (request.message === "options") {
          console.log("Received new options settings");
          storage.get({
            apiKey: '',
            ankiKey: '',
            ankiDeck: '',
          }, function (items) {
            setApiKey(items.apiKey);
            setAnkiKey(items.ankiKey);
            setAnkiDeck(items.ankiDeck);
          });
        }
        console.log("received message");
      }
    );

    // Add listener for the selection event
    document.addEventListener("selectionchange", selectionChange);
  }, []);

  async function callGPT3() {
    // Call GPT3 with userInput
    setCallingOpenAi(true);
    try {
      const url = `https://api.openai.com/v1/completions`;
      const options = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt: promptTemplate.replace('{selectedText}', selectedText).replace("{words}", words),
          temperature: 0,
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
      setErrorMessage("");
    }
    catch (e) {
      console.log(e);
      setErrorMessage("Error generating Q&A");
    }
    setCallingOpenAi(false);
  }

  async function addNote() {
    setCallingAnki(true);
    try {
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
      setErrorMessage("");
    } catch (e) {
      setErrorMessage("Error adding note to Anki");
      console.log(e);
    }
    setCallingAnki(false);
    return;
  }

  function openOptions() {
    console.log("sending open message")
    runtime.sendMessage({ action: "openOptionsPage" });
    console.log("sent open message")
  }

  let apiKeyMessage = null;
  if (apiKey === null || apiKey === undefined || apiKey === '') {
    apiKeyMessage = <h1 className="text-red-400"><button onClick={openOptions}>You need to set the Open AI API key</button></h1>
  }

  let ankiKeyMessage = null;
  if (ankiKey === null || ankiKey === undefined || ankiKey === '') {
    ankiKeyMessage = <h1 className="text-red-400"><button onClick={openOptions}>You need to set the Anki API key</button></h1>
  }

  let ankiDeckMessage = null;
  if (ankiDeck === null || ankiDeck === undefined || ankiDeck === '') {
    ankiDeckMessage = <h1 className="text-red-400"><button onClick={openOptions}>You need to set the Anki deck</button></h1>
  }

  let errorDisplay = null;
  if (errorMessage !== null) {
    errorDisplay = <h1 className="text-red-400">{errorMessage}</h1>
  }

  return (
    <div className='p-2'>
      <h1 className='mb-2 text-center'>{"Anki + LLMs = 🖤"}</h1>
      {isHttps && (<div className="flex flex-col w-fixed h-auto w-64">
      <div className="border rounded-md p-1 border-slate-400 mb-2">
          <input className="accent-sky-300" type="range" min="10" max="100" value={words} onChange={updateOnChange(setWords)} />
          <p>Max number of words: {words}</p>
        </div>
        <button className={`flex items-center justify-center mb-2 border-2 rounded-md ${canPressGenerate ? "hover:bg-sky-200" : "cursor-not-allowed"} bg-slate-300`} onClick={callGPT3} disabled={!canPressGenerate}>{callingOpenAi ? spinnerIcon : "Generate"}</button>      
        <div className="mb-2 rounded-md p-1 border border-slate-400" onChange={updateOnChange(setQuestion)} placeholder="Generated Question" contentEditable={true}>
          <p>{question}</p>
          {!question && <p className="text-slate-300">Generated Question</p>}
        </div>
        <div className="mb-2 rounded-md p-1 border border-slate-400" onChange={updateOnChange(setAnswer)} placeholder="Generated Answer" contentEditable={true}>
          <p>{answer}</p>
          {!answer && <p className="text-slate-300">Generated Answer</p>}
        </div>
        <div className="flex mb-2 rounded-md p-1 border border-slate-400 max-h-44 overflow-auto" placeholder="Selection">
          {selectedText}
          {!selectedText && <p className="text-slate-300">Selection</p>}
        </div>
        <button className={`flex items-center justify-center mb-2 border-2 rounded-md ${canPressGenerate ? "hover:bg-sky-200" : "cursor-not-allowed"} bg-slate-300`} onClick={addNote} disabled={!canPressAdd}>{callingAnki ? spinnerIcon : "Add Note"}</button>
        <button className="flex items-center justify-center mb-2 border-2 rounded-md hover:bg-sky-200 bg-slate-300" onClick={openOptions}>Settings</button>
        {errorDisplay}
        {apiKeyMessage}
        {ankiKeyMessage}
        {ankiDeckMessage}
        
      </div>)}
      {!isHttps && (<h1>HTTPS is required for this extension to work</h1>)}
    </div>
  );
};

export default Content;
