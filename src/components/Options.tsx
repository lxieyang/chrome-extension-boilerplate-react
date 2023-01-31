import React, { useEffect } from 'react';

interface OptionsPrompts {
    storage: {
      get: (keys: string | string[] | { [key: string]: any } | null, callback: (items: { [key: string]: any }) => void) => void;
      set: (items: { [key: string]: any }, callback?: () => void) => void
    }
}

function Options({storage}: OptionsPrompts) {
  const [apiKey, setApiKey] = React.useState<string>('');
  const [ankiKey, setAnkiKey] = React.useState<string>('');
  const [ankiDeck, setAnkiDeck] = React.useState<string>('');
  // Load saved keys, if they exists.
  useEffect(() => {
    storage.get({
      apiKey: '',
      ankiKey: '',
      ankiDeck: '',
    }, function (items) {
      setApiKey(items.apiKey);
      setAnkiKey(items.ankiKey);
      setAnkiDeck(items.ankiDeck);
    });
  }, []);

  function generateStateChangeHandler(setter) {
    return function (event: React.ChangeEvent<HTMLTextAreaElement>) {
      setter(event.target.value);
    }
  }

  function generateHandleSaveClick(name, state, setter) {
    return function () {
      storage.set({
        [name]: state,
      }, function () {
        // Update status to let user know options were saved.
        const realState = state;
        setter('Options saved');
        setTimeout(function () {
          setter(realState);
        }, 750);
        /*
        try {
          chrome.runtime.sendMessage({"message": "options"});
        } catch {
          console.error("Didn't send message")
        }
        */
      })
    }
  }

  function generateUnsetter(name, setter) {
    return function () {
      storage.set({
        [name]: '',
      }, async function () {
        // Update status to let user know options were saved.
        await setter('Options saved');
        setTimeout(function () {
          setter('');
        }, 750);
        /*
        console.log("Made it!")
        try {
          await chrome.runtime.sendMessage({"message": "options"});
          console.log("Sent message!")
          chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {"message": "popup"});
        });
        } catch {
          console.error("Didn't send message")
        }
        */
      })
    }
  }

  function setterElement(name, state, setter, title) {
    return <div className="flex flex-col justify-center text-center text-red-400">
    <p>{title}</p>
    <textarea value={state} onChange={generateStateChangeHandler(setter)}></textarea>
    <div>
      <button onClick={generateHandleSaveClick(name, state, setter)}>Save</button>
      <button onClick={generateUnsetter(name, setter)}>Unset</button>
    </div>
  </div>
  }

  return <div className="OptionsContainer">
    {setterElement("apiKey", apiKey, setApiKey, "Open AI API Key")}
    {setterElement("ankiKey", ankiKey, setAnkiKey, "Anki API Key")}
    {setterElement("ankiDeck", ankiDeck, setAnkiDeck, "Anki Deck")}
  </div>;
};

export default Options;
