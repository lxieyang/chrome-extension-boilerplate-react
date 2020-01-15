import React, { useState } from 'react';
import {
  Button,
  ListItem,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Link,
  CardActions,
} from '@material-ui/core';
import { sendMessage } from './chrome';
import { MySnackbar } from '../../components/MySnackbar';

const pad = (i) => {
  if (i < 10) return `0${i}`;
  return i;
};

export const Capture = ({ item }) => {
  const { dataUrl, time, url, title, gyazo } = item;
  const [open, setOpen] = useState(false);

  const jump = (href) => sendMessage({ type: 'JUMP', href });
  const tweet = () => {
    chrome.tabs.query({ url: '*://gyazo.com/*' }, (tabs) => {
      if (tabs[0]) {
        const id = tabs[0].id;
        chrome.tabs.sendMessage(id, {
          type: 'REMOTETWEET',
          imageId: gyazo.split('/')[3],
          body: url,
        });
        setOpen(true);
      } else {
        sendMessage({ type: 'TWEET', url: gyazo });
      }
    });
  };

  return (
    <ListItem>
      <MySnackbar open={open} setOpen={setOpen} message={'Tweeted'} />
      <Card>
        <CardMedia component="img" src={dataUrl}></CardMedia>
        <CardContent>
          <Link onClick={() => jump(url)}>{title}</Link>
          <Typography variant="caption">
            <br />
            {`${pad(Math.floor(time / 60))}:${pad(time % 60)}`}
          </Typography>
        </CardContent>
        <CardActions>
          <Button color="primary" onClick={() => jump(gyazo)}>
            Gyazo
          </Button>
          <Button color="secondary" onClick={() => tweet()}>
            Tweet
          </Button>
        </CardActions>
      </Card>
    </ListItem>
  );
};
