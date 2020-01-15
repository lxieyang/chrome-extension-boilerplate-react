import { Snackbar } from '@material-ui/core';
import React from 'react';

export const MySnackbar = ({ open, setOpen, message }) => (
  <Snackbar
    open={open}
    autoHideDuration={2000}
    onClose={() => setOpen(false)}
    message={message}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
  />
);
