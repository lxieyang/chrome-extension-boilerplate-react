import React, { useEffect, useState } from 'react';
import { Button, List, ListItem, Card, CardMedia, CardContent, Typography, Link, CardActions } from '@material-ui/core';
import { gyazo } from './gyazo';

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
      </CardActions>
    </Card>
  </ListItem>
}

const Popup = () => {
  const [list, setList] = useState([]);
  const push = async (msg) => {
    const { dataUrl, title, url } = msg;

    const gyazoUrl = await gyazo({ image_url: dataUrl, title, url })
    
    const el = {
      ...msg,
      dataUrl: gyazoUrl.imageUrl,
      gyazo: gyazoUrl.gyazo
    }
    chrome.storage.local.get(['list'], (result) => {
      let list = []
      if (result.list) list = result.list;
      list.unshift(el);
      setList(Object.assign([], list));
      chrome.storage.local.set({ list: list.slice(0, 20) });
    });
  }

  useEffect(() => {
    chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
      if (msg.type == 'res') {
        push(msg);
      }
    });
  }, [])

  useEffect(() => {
    chrome.storage.local.get(['list'], (result) => {
      if (result.list) setList(result.list);
    })
  }, [])

  const capture = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      chrome.tabs.sendMessage(tab.id, { type: 'CAPTURE' })
    });
  }

  return <>
    <Button color='primary' variant='contained' onClick={capture}>Capture</Button>
    <List>
      {list.map((l) => <Capture item={l} key={l.id} />)}
    </List>
  </>
}

export default Popup;
