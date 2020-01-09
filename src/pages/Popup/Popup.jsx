import React, { useEffect, useState } from 'react';
import { Button, List, ListItem, Card, CardMedia, CardContent, Typography, Link } from '@material-ui/core';

const Capture = ({ item }) => {
  const { dataUrl, time, url, title } = item;

  return <ListItem>
    <Card>
      <CardMedia component='img' src={dataUrl}></CardMedia>
      <CardContent>
        <Typography>
          {`${Math.floor(time/60)}:${time%60}`}
        </Typography>
        <Link href={url}>
          {title}
        </Link>
      </CardContent>
    </Card>
  </ListItem>
}

const Popup = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
      if (msg.type == 'res') {
        list.unshift(msg);
        setList(Object.assign([], list));
        chrome.storage.local.set({ list: list.slice(0, 20) });
      }
    });
  }, [])

  useEffect(() => {
    chrome.storage.local.get(['list'], (result) => {
      if(result.list) setList(result.list);
    })
  }, [])

  const capture = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      chrome.tabs.sendMessage(tab.id, {type: 'CAPTURE'})
    });
  }
  console.log('shit')
  return <>
    <Button color='primary' variant='contained' onClick={capture}>Capture</Button>
    <List>
      {list.map((l) => <Capture item={l} key={l.id}/>)}
    </List>
  </>
}

export default Popup;
