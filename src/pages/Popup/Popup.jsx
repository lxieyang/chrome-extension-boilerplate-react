import React from 'react';
import logo from '../../assets/img/logo.png';
import save from '../../assets/img/save.png';
import Greetings from '../../containers/Greetings/Greetings';
import { Box, Button, Switch, Typography } from '@mui/material';
import { getAuthToken, constants, getReferrerIdKey } from './utils.js';
import { v4 as uuidv4 } from 'uuid';

const Popup = () => {
  async function profitability_modal() {
    let authToken = await getAuthToken();
    let useCount = await chrome.storage.local.get(
      constants.profitabiltyUseCountKey
    );
    if (
      (authToken && authToken[constants.authTokenKey]) ||
      !useCount[constants.profitabiltyUseCountKey] ||
      useCount[constants.profitabiltyUseCountKey] < 2
    ) {
      let currentUseCount = useCount[constants.profitabiltyUseCountKey]
        ? useCount[constants.profitabiltyUseCountKey] + 1
        : 1;
      chrome.storage.local.set({
        [constants.profitabiltyUseCountKey]: currentUseCount,
      });
      chrome.runtime.sendMessage({ message: 'profitability_modal' });
    } else {
      // show to free login
    }
  }
  async function review_modal() {
    let authToken = await getAuthToken();
    let useCount = await chrome.storage.local.get(constants.reviewUseCountKey);
    if (
      (authToken && authToken[constants.authTokenKey]) ||
      !useCount[constants.reviewUseCountKey] ||
      useCount[constants.reviewUseCountKey] < 2
    ) {
      let currentUseCount = useCount[constants.reviewUseCountKey]
        ? useCount[constants.reviewUseCountKey] + 1
        : 1;
      chrome.storage.local.set({
        [constants.reviewUseCountKey]: currentUseCount,
      });
      chrome.runtime.sendMessage({ message: 'review_modal' });
    } else {
      // show to free login
    }
  }
  async function signUp() {
    let referrerIdValue = await getReferrerIdKey();
    // console.log(referrerIdValue);
    let uuid =
      referrerIdValue && referrerIdValue[constants.referrerIdKey]
        ? referrerIdValue[constants.referrerIdKey]
        : uuidv4();
    if (!referrerIdValue) {
      chrome.storage.local.set({ [constants.referrerIdKey]: uuid });
    }
    chrome.tabs.create({
      url: `${constants.API_URL}register?referrer=extension&referrerId=${uuid}`,
      active: true,
    });
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
            onClick={signUp}
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
