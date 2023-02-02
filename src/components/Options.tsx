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
  const [saveButtonText, setSaveButtonText] = React.useState<string>('Save');
  const [clearButtonText, setClearButtonText] = React.useState<string>('Clear');
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
    if (apiKey === '' || ankiKey === '' || ankiDeck === '') {
      setSaveButtonText('Please fill out all fields');
      return;
    }
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

  function clear() {
    storage.set({
      apiKey: "",
      ankiKey: "",
      ankiDeck: "",
    }, function () {
      // Update status to let user know options were saved.
      setAnkiKey("");
      setApiKey("");
      setAnkiDeck("");
      setClearButtonText('Settings cleared');
      setTimeout(function () {
        setClearButtonText('Clear');
      }, 750);
    })
  }

  function setterElement(state, setter, title) {
    return <div className="flex flex-col pb-3 items-center">
    <p className="pr-2">{title}</p>
    <input className="flex border-2 rounded-md px-1 justify-self-end grow" value={state} onChange={generateStateChangeHandler(setter)}></input>
  </div>
  }

  return <div className="flex flex-col p-2 w-fit">
    {setterElement(apiKey, setApiKey, "Open AI API Key")}
    {setterElement(ankiKey, setAnkiKey, "Anki API Key")}
    {setterElement(ankiDeck, setAnkiDeck, "Anki Deck")}
    <button className="flex items-center justify-center mt-2 mb-2 border-2 rounded-md hover:bg-sky-200 bg-slate-300 px-1" onClick={save}>{saveButtonText}</button>
    <button className="flex items-center justify-center mt-2 mb-2 border-2 rounded-md hover:bg-sky-200 bg-red-300 px-1" onClick={clear}>{clearButtonText}</button>
  </div>;
};

export default Options;
