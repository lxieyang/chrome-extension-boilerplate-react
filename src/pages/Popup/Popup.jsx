import React from 'react';
import logo from '../../assets/img/logo.png';
import save from '../../assets/img/save.png';
import Greetings from '../../containers/Greetings/Greetings';
import { Box, Button, Switch, Typography } from '@mui/material';
import { getAuthToken, constants, getReferrerIdKey } from './utils.js';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import { urlGenerator } from './utils.js';

const Popup = () => {

const [pvalue, setPvalue] = useState(2)
const [rvalue, setRvalue] = useState(2)

  const [isLogin, setIsLogin] = useState(false)
  const [tokenLeft, setTokenLeft] = useState(false);

  
  async function profitability_modal() {
    let authToken = await getAuthToken();
    let useCount = await chrome.storage.sync.get(
      constants.profitabiltyUseCountKey
    );
    if(useCount[constants.reviewUseCountKey] < 2){
      setPvalue(2-useCount[constants.profitabiltyUseCountKey] )
    }
    else
    setPvalue(0)
    if (
      (authToken && authToken[constants.authTokenKey]) ||
      !useCount[constants.profitabiltyUseCountKey] ||
      useCount[constants.profitabiltyUseCountKey] < 2
    ) {
      let currentUseCount = useCount[constants.profitabiltyUseCountKey]
        ? useCount[constants.profitabiltyUseCountKey] + 1
        : 1;
      chrome.storage.sync.set({
        [constants.profitabiltyUseCountKey]: currentUseCount,
      });
      chrome.runtime.sendMessage({ message: 'profitability_modal' });
    } else {
      setPvalue(0)
      setTokenLeft(true)
    }
  }
  async function review_modal() {
    
    let authToken = await getAuthToken();
    let useCount = await chrome.storage.sync.get(constants.reviewUseCountKey);
    if(useCount[constants.reviewUseCountKey] < 2){
      setRvalue(2 - useCount[constants.reviewUseCountKey] )
    }
    else
    setRvalue(0)
    if (
      (authToken && authToken[constants.authTokenKey]) ||
      !useCount[constants.reviewUseCountKey] ||
      useCount[constants.reviewUseCountKey] < 2
    ) {
      let currentUseCount = useCount[constants.reviewUseCountKey]
        ? useCount[constants.reviewUseCountKey] + 1
        : 1;
      chrome.storage.sync.set({
        [constants.reviewUseCountKey]: currentUseCount,
      });
      chrome.runtime.sendMessage({ message: 'review_modal' });
    } else {
      // show to free login
      setRvalue(0)
      setTokenLeft(true)
    }
  }
  async function signUp() {
    let referrerIdValue = await getReferrerIdKey();
    // console.log(referrerIdValue);
    let uuid =
      referrerIdValue && referrerIdValue[constants.referrerIdKey]
        ? referrerIdValue[constants.referrerIdKey]
        : uuidv4();
    if (!referrerIdValue || !referrerIdValue[constants.referrerIdKey] ) {
      chrome.storage.local.set({ [constants.referrerIdKey]: uuid });
    }
    chrome.tabs.create({
      url: `${constants.API_URL}register?referrer=extension&referrerId=${uuid}`,
      active: true,
    });
  }
  const [collected, setCollected] = useState(false)

  const collection = async ()=> {
    
    const urlToSave = await urlGenerator();
    console.log(urlToSave)
    let url = 'https://www.datavio.co/backend/extension/save-collection';
    let body = { url: `${urlToSave}` };
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    console.log(response.message);
    setCollected(true)
  }

  const userLogin = async ()=> {

    let referrerIdValue = await getReferrerIdKey();
		if (referrerIdValue) {
			referrerIdValue = referrerIdValue[constants.referrerIdKey];
			// make  request to refresh token
    let url = `https://www.datavio.co/backend/extension/get-token?referrerId=${referrerIdValue}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (data && data['loginToken']) {
      chrome.storage.local.set({
        [constants.authTokenKey]: data['loginToken'],
      });
    setIsLogin(true)
  }
}
  }
userLogin()

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
          sx={{ width: '81%', justifyContent: 'center', m: '10px 0 10px 0' , display: 'flex',
          alignItems: 'center',
          flexDirection: 'column'}}
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
          
          <Typography variant="body2"> ({pvalue} Left)</Typography>
        </Box>
        <Box
          sx={{
            m: '10px 0 10px 0',
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
          <Typography variant="body2"> ({rvalue} Left)</Typography>
        </Box>
        <Box
          sx={{ width: '81%', justifyContent: 'center', m: '10px 0 10px 0', display: 'flex',
          alignItems: 'center',
          flexDirection: 'column' }}
        >
          {tokenLeft && <Typography variant="body2"> Create a free account to use more</Typography>}
          {!isLogin &&  <Button
            onClick={signUp}
            fullWidth
            size="small"
            sx={{ backgroundColor: '#b85c91' }}
            color="secondary"
            variant="contained"
          >
            Login / Sign up
          </Button>}
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
            width: collected?'180px':'160px',
            margin: '5px',
            height: '30px',
          }}
          onClick={collection}
        >
          <img src={save} alt="save" width="auto" height="35px" />
          {!collected &&<Typography variant="body2" color="white">
            {' '}
            Add To Collection{' '}
          </Typography>}
          {collected &&<Typography variant="body2" color="white">
            {' '}
            Added To Collection{' '}
          </Typography>}
        </Box>
      </Box>
    </Box>
  );
};

export default Popup;
