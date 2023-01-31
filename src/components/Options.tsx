import React, { useEffect } from 'react';
import Button from './Button';

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
  const [saveButtonText, setSaveButtonText] = React.useState<string>('Save');
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
    return function (event: React.ChangeEvent<HTMLInputElement>) {
      setter(event.target.value);
    }
  }

  function save() {
    storage.set({
      apiKey: apiKey,
      ankiKey: ankiKey,
      ankiDeck: ankiDeck,
    }, function () {
      // Update status to let user know options were saved.
      setSaveButtonText('Options saved');
      setTimeout(function () {
        setSaveButtonText('Save');
      }, 750);
    })
  }

  function setterElement(state, setter, title) {
    return <div className="flex flex-row pb-3 items-center">
    <p className="pr-2">{title}:</p>
    <input className="border-2 rounded-md px-1" value={state} onChange={generateStateChangeHandler(setter)}></input>
  </div>
  }

  return <div className="flex flex-col p-2">
    {setterElement(apiKey, setApiKey, "Open AI API Key")}
    {setterElement(ankiKey, setAnkiKey, "Anki API Key")}
    {setterElement(ankiDeck, setAnkiDeck, "Anki Deck")}
    <Button onClick={save} text={saveButtonText}/>
  </div>;
};

export default Options;
