import React, { useEffect, useState } from 'react';
import {
  Button,
  List,
  ListItem,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Link,
  CardActions,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { sendMessage } from './chrome';

const pad = (i) => {
  if (i < 10) return `0${i}`;
  return i;
};

export const Capture = ({ item }) => {
  const { dataUrl, time, url, title, gyazo } = item;

  const jump = (href) => sendMessage({ type: 'JUMP', href });
  const tweet = () => sendMessage({ type: 'TWEET', url: gyazo });

  return (
    <ListItem>
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
