import React, { Component } from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';

// react material ui
import { green, pink, red } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DeleteIcon from '@mui/icons-material/Delete';
import { ListItemSecondaryAction } from '@mui/material';

function WithoutTime(dateTime) {
  var date = new Date(dateTime);
  date.setHours(0, 0, 0, 0);
  return date;
}

function ISOStringToDate(ISOString) {
  return ISOString.slice(0, 10);
}

function diffInDays(startDate, endDate) {
  const diffInMs = new Date(endDate) - new Date(startDate)
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  return Math.floor(diffInDays);
}

class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.removebyid = this.removebyid.bind(this);

    chrome.storage.sync.get(
      'data',
      function (items) {
        if (Object.keys(items).length > 0) {
          this.setState({ data: items.data });
          console.log(this.state);
        }
      }.bind(this)
    );
  }

  removebyid(id) {
    chrome.storage.sync.get(
      'data',
      function (items) {
        let redos;
        if (Object.keys(items).length === 0) {
          redos = [];
        } else {
          redos = items.data;
        }
        let index = 0;
        for (; index < redos.length; index++) {
          if (redos[index].id === id) {
            redos.splice(index, 1);
            break;
          }
        }
        chrome.storage.sync.set(
          { data: redos },
          function () {
            chrome.storage.sync.get(
              'data',
              function (items) {
                if (Object.keys(items).length > 0) {
                  this.setState({ data: items.data });
                }
              }.bind(this)
            );
          }.bind(this)
        );
      }.bind(this)
    );
  }

  render() {
    const itemsList = this.state.data.map((redo) => {
      let displayTitle = redo.uri.slice(0, -13);
      const lastSlash = displayTitle.lastIndexOf('/');
      displayTitle = displayTitle.slice(lastSlash + 1);
      const today = new Date().toISOString();
      let daysAway = diffInDays(ISOStringToDate(today), ISOStringToDate(redo.reminderDate));
      const avatarBgColor = daysAway <= 0 ? red[700] : green[700];
      return (
        <ListItem
          key={redo.id}
          button
          component="a"
          href={redo.uri}
          onClick={(e) => { chrome.tabs.update({ url: redo.uri }); e.preventDefault(); }}
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: avatarBgColor }}>
              <AssignmentIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={displayTitle}
            secondary={daysAway <= 0 ? 'Time to re-do!' : `${daysAway} days away`}
          />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={(e) => {
                e.preventDefault();
                this.removebyid(redo.id)
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
    });

    return (
      <div className="App">
        <header className="App-header">
          <Typography variant="h6" component="div">
            LeetCode List
          </Typography>
          <List
            dense={false}
            style={{ maxHeight: '100%', overflow: 'auto' }}
          // subheader={<ListSubheader>Problem List</ListSubheader>}
          >
            {itemsList}
          </List>
        </header>
      </div>
    );
  }
}

export default Popup;
