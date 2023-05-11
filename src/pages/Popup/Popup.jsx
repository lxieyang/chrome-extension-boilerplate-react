import React from 'react';
import logo from '../../assets/img/logo.png';
import save from '../../assets/img/save.png';
import Greetings from '../../containers/Greetings/Greetings';
import { Box, Button, Switch, Typography } from '@mui/material';

const Popup = () => {
  function profitability_modal() {
    chrome.runtime.sendMessage({ message: 'profitability_modal' });
  }
  function review_modal() {
    chrome.runtime.sendMessage({ message: 'review_modal' });
  }
  return (
    <Box
      sx={{
        borderRadius: '5px',
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        height: '300px',
      }}
    >
      <Box
        sx={{
          margin: '10px',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
        >
          <Box sx={{ alignItems: 'center' }}>
            <img
              style={{ margin: '2px 10px 0 0' }}
              src={logo}
              alt="hershield"
              width="auto"
              height="30px"
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" color="">
              <strong>Extension</strong>
            </Typography>
          </Box>
        </Box>
        <Box sx={{ marginRight: '20px' }}>
          <Switch color="secondary" defaultChecked />
        </Box>
      </Box>
      <Box
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{ width: '81%', justifyContent: 'center', m: '10px 0 10px 0' }}
        >
          <Button
            onClick={profitability_modal}
            sx={{ backgroundColor: '#b85c91' }}
            size="small"
            color="secondary"
            fullWidth
            variant="contained"
          >
            Profitability Calculator
          </Button>
        </Box>
        <Box
          sx={{
            m: '10px 0 25px 0',
            width: '81%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Button
            onClick={review_modal}
            sx={{ backgroundColor: '#b85c91' }}
            fullWidth
            size="small"
            color="secondary"
            variant="contained"
          >
            Review Analyzer
          </Button>
          <Typography variant="body2"> (2 Left)</Typography>
        </Box>
        <Box
          sx={{ width: '81%', justifyContent: 'center', m: '10px 0 10px 0' }}
        >
          <Button
            fullWidth
            size="small"
            sx={{ backgroundColor: '#b85c91' }}
            color="secondary"
            variant="contained"
          >
            Login / Sign up
          </Button>
        </Box>
      </Box>
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            cursor: 'pointer',
            backgroundColor: '#b85c91',
            borderRadius: '5px',
            width: '160px',
            margin: '5px',
            height: '30px',
          }}
        >
          <img src={save} alt="save" width="auto" height="35px" />
          <Typography variant="body2" color="white">
            {' '}
            Add To Collection{' '}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Popup;
