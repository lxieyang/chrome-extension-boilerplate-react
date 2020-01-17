import React, { useEffect, useState } from 'react';
import { Button, List, Checkbox, FormControlLabel } from '@material-ui/core';

import ReactHotkeys from 'react-hot-keys';
import { sendMessage, useStorage } from './chrome';
import { Capture } from './Capture';

const Popup = () => {
  const [list, setList] = useState([]);
  const [subs, setSubs] = useState(false);

  useStorage({ key: 'list' }, setList);
  useStorage({ key: 'subs' }, (subs) => {
    setSubs(subs);
    capture(subs);
  });

  useEffect(() => {
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg.type === 'listUpdated') {
        chrome.storage.local.get(['list'], (result) =>
          setList(result.list || [])
        );
      }
    });
  }, []);

  useEffect(() => {
    chrome.storage.local.set({ subs });
  }, [subs]);

  const capture = (subs) => {
    const type = subs ? 'SUBS' : 'CAPTURE';
    sendMessage({ type });
  };

  return (
    <ReactHotkeys keyName="shift+c" onKeyUp={() => capture(subs)}>
      <Button color="primary" variant="contained" onClick={() => capture(subs)}>
        Capture
      </Button>
      <span style={{ width: 10 }}>&nbsp;&nbsp;</span>
      <FormControlLabel
        label="with Subs"
        control={<Checkbox checked={subs} onChange={() => setSubs(!subs)} />}
      />
      <List>{list && list.map((l) => <Capture item={l} key={l.id} />)}</List>
    </ReactHotkeys>
  );
};

export default Popup;
