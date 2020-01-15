import React, { useEffect, useState } from 'react';
import { Button, List, Checkbox, FormControlLabel } from '@material-ui/core';
import { gyazo } from './gyazo';
import { trim } from './trim';
import ReactHotkeys from 'react-hot-keys';
import { sendMessage, useStorage, useBlacklist } from './chrome';
import { Capture } from './Capture';

const useMessageFromContentScript = (callback) => {
  useEffect(() => {
    chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
      if (msg.type === 'res') {
        callback(msg);
      }
      if (msg.type === 'rect') {
        const { x, y, width, height } = msg;
        chrome.tabs.captureVisibleTab(
          null,
          { format: 'png' },
          async (dataUrl) => {
            trim(dataUrl, x, y, width, height, (dataUrl) => {
              callback({ ...msg, dataUrl });
            });
          }
        );
      }
    });
  }, []);
};

const Popup = () => {
  const [list, setList] = useState([]);
  const [subs, setSubs] = useState(false);
  const blacklist = useBlacklist();
  const push = async (msg) => {
    const { dataUrl, title, url } = msg;
    const match = !!blacklist.filter((d) => url.match(d))[0];

    const gyazoUrl = match
      ? await gyazo({ image_url: dataUrl })
      : await gyazo({ image_url: dataUrl, title, url });

    const newList = Object.assign([], list);
    newList.push(msg);
    setList(newList);

    const el = { ...msg, dataUrl: gyazoUrl.imageUrl, gyazo: gyazoUrl.gyazo };
    chrome.storage.local.get(['list'], (result) => {
      let list = [];
      if (result.list) list = result.list;
      list.unshift(el);
      setList(Object.assign([], list));
      chrome.storage.local.set({ list: list.slice(0, 20) });
    });
  };

  useStorage({ key: 'list' }, setList);
  useStorage({ key: 'subs' }, (subs) => {
    setSubs(subs);
    capture(subs);
  });

  useMessageFromContentScript(push);

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
