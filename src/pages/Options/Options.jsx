import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  TextareaAutosize,
  Snackbar,
} from '@material-ui/core';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
};

const MySnackbar = ({ open, setOpen }) => (
  <Snackbar
    open={open}
    autoHideDuration={2000}
    onClose={() => setOpen(false)}
    message="Saved"
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
  />
);

const Options = () => {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState(null);
  const debouncedList = useDebounce(list, 500);

  useEffect(() => {
    chrome.storage.sync.get(['blacklist'], (result) => {
      if (result.blacklist) setList(result.blacklist);
    });
  }, []);

  const onChange = (value) => {
    setList(value);
  };

  useEffect(() => {
    if (list !== null) {
      chrome.storage.sync.get(['blacklist'], (result) => {
        if (result.blacklist !== list) {
          chrome.storage.sync.set({ blacklist: debouncedList });
          setOpen(true);
        }
      });
    }
  }, [debouncedList]);

  return (
    <Paper style={{ padding: '20px', margin: '20px', maxWidth: '800px' }}>
      <Typography variant="h2">Capture Video Element</Typography>
      <Typography variant="h4">Blacklist for Site Information</Typography>
      <TextareaAutosize
        defaultValue={list}
        onChange={(e) => onChange(e.target.value)}
        rowsMin={15}
        style={{ width: '95%' }}
      />
      <MySnackbar open={open} setOpen={setOpen} />
    </Paper>
  );
};

export default Options;
