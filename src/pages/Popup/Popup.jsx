import React, { useEffect, useState } from 'react';
import { Button, List, ListItem, Card, CardMedia, CardContent, Typography, Link, CardActions, Checkbox, FormControlLabel } from '@material-ui/core';
import { gyazo } from './gyazo';
import { trim } from './trim';

const pad = (i) => {
  if (i < 10) return `0${i}`
  return i
}

const Capture = ({ item }) => {
  const { dataUrl, time, url, title, gyazo } = item;

  const jump = (href) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      chrome.tabs.sendMessage(tab.id, { type: 'JUMP', href })
    });
  }

  const tweet = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      chrome.tabs.sendMessage(tab.id, { type: 'TWEET', url: gyazo });
    });
  }

  return <ListItem>
    <Card>
      <CardMedia component='img' src={dataUrl}></CardMedia>
      <CardContent>
        <Link onClick={() => jump(url)}>
          {title}
        </Link>
        <Typography variant='caption'>
          <br />
          {`${pad(Math.floor(time / 60))}:${pad(time % 60)}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button color='primary' onClick={() => jump(gyazo)}>Gyazo</Button>
        <Button color='secondary' onClick={() => tweet()}>Tweet</Button>
      </CardActions>
    </Card>
  </ListItem>
}

const Popup = () => {
  const [list, setList] = useState([]);
  const [subs, setSubs] = useState(false);
  const push = (msg) => {
    const { dataUrl, title, url } = msg;

    chrome.storage.sync.get(['blacklist'], async (result) => {
      const blacklist = result.blacklist ? result.blacklist.split("\n").filter((n)=> !!n) : [];
      const match = !!blacklist.filter(d => url.match(d))[0];

      const gyazoUrl = match ? await gyazo({ image_url: dataUrl }) : await gyazo({ image_url: dataUrl, title, url });

      const newList = Object.assign([], list);
      newList.push(msg);
      setList(newList);
    
      const el = { ...msg, dataUrl: gyazoUrl.imageUrl, gyazo: gyazoUrl.gyazo }
      chrome.storage.local.get(['list'], (result) => {
        let list = []
        if (result.list) list = result.list;
        list.unshift(el);
        setList(Object.assign([], list));
        chrome.storage.local.set({ list: list.slice(0, 20) });
      });
    });
  }

  useEffect(() => {
    chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
      if (msg.type === 'res') {
        push(msg);
      }
      if (msg.type === 'rect') {
        const { x, y, width, height } = msg;
        chrome.tabs.captureVisibleTab(null, { format: 'png' }, async (dataUrl) => {
          trim(dataUrl, x, y, width, height, (dataUrl) => {
            push({ ...msg, dataUrl });
          })
        })
      }
    });
  }, [])

  useEffect(() => {
    chrome.storage.local.get(['list', 'subs'], (result) => {
      if (result.list) setList(result.list);
      if (result.subs) setSubs(result.subs);
      capture(result.subs);
    })
    
  }, [])

  useEffect(() => { chrome.storage.local.set({ subs }); }, [subs])

  const capture = (subs) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      const type = subs ? 'SUBS' : 'CAPTURE'
      chrome.tabs.sendMessage(tab.id, { type })
    });
  }

  return <>
    <Button color='primary' variant='contained' onClick={() => capture(subs)}>Capture</Button>
    <span style={{ width: 10 }}>&nbsp;&nbsp;</span>
    <FormControlLabel label="with Subs" control={<Checkbox checked={subs} onChange={() => setSubs(!subs)} />} />
    <List>
      {list.map((l) => <Capture item={l} key={l.id} />)}
    </List>
  </>
}

export default Popup;
