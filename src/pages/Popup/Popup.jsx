import React from 'react';
import logo from '../../assets/img/logo.png';
import save from '../../assets/img/save.png';
import Greetings from '../../containers/Greetings/Greetings';
import { Box, Button, Switch, Typography } from '@mui/material';

const Popup = () => {
  let profitabiltyUseCountKey = 'dv_pc_use_count';
  let reviewUseCountKey = 'dv_review_use_count';
  async function profitability_modal() {
    // chrome.storage.local.remove(constants.authTokenKey);
    // chrome.storage.local.remove(profitabiltyUseCountKey);
    let authToken = await getAuthToken();
    let useCount = await chrome.storage.local.get(profitabiltyUseCountKey);
    if (
      (authToken && authToken[constants.authTokenKey]) ||
      !useCount[profitabiltyUseCountKey] ||
      useCount[profitabiltyUseCountKey] < 2
    ) {
      let currentUseCount = useCount[profitabiltyUseCountKey]
        ? useCount[profitabiltyUseCountKey] + 1
        : 1;
      chrome.storage.local.set({
        [profitabiltyUseCountKey]: currentUseCount,
      });
      chrome.runtime.sendMessage({ message: 'profitability_modal' });
    } else {
      // generate random string and store in local storage
      let referrerIdValue = await getReferrerIdKey();
      let uuid = referrerIdValue
        ? referrerIdValue[constants.referrerIdKey]
        : uuidv4();
      if (!referrerIdValue) {
        chrome.storage.local.set({ [constants.referrerIdKey]: uuid });
      }

      chrome.tabs.create({
        url: `${constants.API_URL}login?referrer=extension&referrerId=${uuid}`,
        active: true,
      });
    }
  }
  async function review_modal() {
    // let useCount = await chrome.storage.local.get(reviewUseCountKey);
    // if (useCount[reviewUseCountKey] >= 2) {
    //   // show login modal, // clicking on login redirect to login page
    //   chrome.tabs.create({ url: 'https://www.datavio.co/login', active: true });
    //   return;
    // } else {
    //   let currenUseCount = useCount[reviewUseCountKey]
    //     ? useCount[reviewUseCountKey] + 1
    //     : 1;
    //   chrome.storage.local.set({
    //     [reviewUseCountKey]: currenUseCount,
    //   });
    //   chrome.runtime.sendMessage({ message: 'review_modal' });
    // }
  }

  async function refresh_token() {
    let referrerIdValue = await getReferrerIdKey();
    if (referrerIdValue) {
      referrerIdValue = referrerIdValue[constants.referrerIdKey];
      // make  request to refresh token
      try {
        const response = await fetch(
          `${constants.PRODUCT_API_URL}extension/getToken?referrerId=${referrerIdValue}`
        );
        const data = await response.json();
        if (data && data['loginToken']) {
          chrome.storage.local.set({
            [constants.authTokenKey]: data['loginToken'],
          });
        }
      } catch (error) {
        alert('login failed');
      }
    }
    return;
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
            width: 'fit-content',
          }}
        >
          <img src={save} alt="save" width="auto" height="35px" />
          <Typography variant="body2"> Add To Collection </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Popup;
