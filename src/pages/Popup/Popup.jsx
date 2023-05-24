import React from 'react';
import logo from '../../assets/img/logo.png';
import save from '../../assets/img/save.png';
import { Box, Button, Switch, Typography } from '@mui/material';
import { getAuthToken, constants, getReferrerIdKey } from './utils.js';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { urlGenerator } from './utils.js';
import { urlChecker } from './utils.js';

const Popup = () => {
  const [pvalue, setPvalue] = useState(2);
  const [rvalue, setRvalue] = useState(2);
  const [flipPage, setFlipPage] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [collected, setCollected] = useState(false);
  const [isNotCollected, setIsNotCollected] = useState(false);

  const clickCount = async (profCount, revCount) => {
    const authToken = await getAuthToken();
    let url = `${constants.PRODUCT_API_URL}extension/click-count`;
    let body = { profitability: `${profCount}`, review: `${revCount}` };
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authToken[constants.authTokenKey],
      },
      body: JSON.stringify(body),
    });
  };

  const anonymousUsageTracker = async (field) => {
    let referrerIdValue = await getReferrerIdKey();
    let uuid =
      referrerIdValue && referrerIdValue[constants.referrerIdKey]
        ? referrerIdValue[constants.referrerIdKey]
        : uuidv4();
        if (!referrerIdValue || !referrerIdValue[constants.referrerIdKey]) {
          chrome.storage.local.set({ [constants.referrerIdKey]: uuid });
        }
    field.referrerId = uuid;
    let url = `${constants.PRODUCT_API_URL}extension/anonymous-click-count`;
    let body = field;
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  };

  async function profitability_modal() {
    let isFlipPage = await urlChecker();
    if (isFlipPage) {
      let authToken = await getAuthToken();
      let useCount = await chrome.storage.sync.get(
        constants.profitabiltyUseCountKey
      );

      let useCountR = await chrome.storage.sync.get(
        constants.reviewUseCountKey
      );
      if (
        useCount[constants.profitabiltyUseCountKey] % 10 === 0 &&
        authToken[constants.authTokenKey]
      ) {
        clickCount(
          useCount[constants.profitabiltyUseCountKey],
          useCountR[constants.reviewUseCountKey]
        );
      }
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
        counter();
        if(!authToken || !authToken[constants.authTokenKey]){
          let body = { profitability : true, referrerId : ""}
          anonymousUsageTracker(body)
        }
      } else {
        setPvalue(0);
      }
    } else {
      setFlipPage(true);
    }
  }
  async function review_modal() {
    let isFlipPage = await urlChecker();
    if (isFlipPage) {
      let authToken = await getAuthToken();
      let useCount = await chrome.storage.sync.get(constants.reviewUseCountKey);
      let useCountP = await chrome.storage.sync.get(
        constants.profitabiltyUseCountKey
      );
      if (
        useCount[constants.reviewUseCountKey] % 10 === 0 &&
        authToken[constants.authTokenKey]
      ) {
        clickCount(
          useCountP[constants.profitabiltyUseCountKey],
          useCount[constants.reviewUseCountKey]
        );
      }
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
        chrome.storage.local.set({"overview":"undefined"});
        chrome.storage.local.set({"allreview":"undefined"});
        chrome.storage.local.set({"wordcloud":"undefined"});
        chrome.runtime.sendMessage({ message: 'review_modal' });
        counter();
        if(!authToken || !authToken[constants.authTokenKey]){
          let body = { review : true, referrerId : ""}
          anonymousUsageTracker(body)
        }
      } else {
        // show to free login
        setRvalue(0);
      }
    } else {
      setFlipPage(true);
    }
  }
  async function signUp() {
    let referrerIdValue = await getReferrerIdKey();
    // console.log(referrerIdValue);
    let uuid =
      referrerIdValue && referrerIdValue[constants.referrerIdKey]
        ? referrerIdValue[constants.referrerIdKey]
        : uuidv4();
    if (!referrerIdValue || !referrerIdValue[constants.referrerIdKey]) {
      chrome.storage.local.set({ [constants.referrerIdKey]: uuid });
    }
      let body = { signUpCount : true, referrerId : ""}
      anonymousUsageTracker(body)
    chrome.tabs.create({
      url: `${constants.API_URL}register?referrer=extension&referrerId=${uuid}`,
      active: true,
    });
  }

  async function keywordResearch() {
    let referrerIdValue = await getReferrerIdKey();
    // console.log(referrerIdValue);
    let uuid =
      referrerIdValue && referrerIdValue[constants.referrerIdKey]
        ? referrerIdValue[constants.referrerIdKey]
        : uuidv4();
    if (!referrerIdValue || !referrerIdValue[constants.referrerIdKey]) {
      chrome.storage.local.set({ [constants.referrerIdKey]: uuid });
    }
      let body = { keywordCount : true, referrerId : ""}
      anonymousUsageTracker(body)
    chrome.tabs.create({
      url: `${constants.API_URL}register?referrer=extension&referrerId=${uuid}`,
      active: true,
    });
  }

  const collection = async () => {
    const urlToSave = await urlGenerator();
    const authToken = await getAuthToken();
    //console.log(urlToSave);
    let url = `${constants.PRODUCT_API_URL}extension/save-collection`;
    let body = { url: `${urlToSave}` };
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authToken[constants.authTokenKey],
      },
      body: JSON.stringify(body),
    });
    if (response.status === 200) setCollected(true);
    else {
      setIsNotCollected(true);
    }
  };

  const userLogin = async () => {
    let referrerIdValue = await getReferrerIdKey();
    let authToken = await getAuthToken();
    if (!authToken || !authToken[constants.authTokenKey]) {
      if (referrerIdValue) {
        referrerIdValue = referrerIdValue[constants.referrerIdKey];
        // make  request to refresh token
        let url = `${constants.PRODUCT_API_URL}extension/get-token?referrerId=${referrerIdValue}`;
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
          setIsLogin(true);
        }
      }
    } else {
      setIsLogin(true);
    }
  };

  const counter = async () => {
    let useCountP = await chrome.storage.sync.get(
      constants.profitabiltyUseCountKey
    );
    let useCountR = await chrome.storage.sync.get(constants.reviewUseCountKey);
    if (
      useCountP[constants.profitabiltyUseCountKey] &&
      useCountP[constants.profitabiltyUseCountKey] < 3 &&
      !isLogin
    )
      setPvalue(2 - useCountP[constants.profitabiltyUseCountKey]);
    else setPvalue(2);
    if (
      useCountR[constants.reviewUseCountKey] &&
      useCountR[constants.reviewUseCountKey] < 3 &&
      !isLogin
    )
      setRvalue(2 - useCountR[constants.reviewUseCountKey]);
    else setRvalue(2);
  };
  counter();

  userLogin();

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
          sx={{
            width: '81%',
            justifyContent: 'center',
            m: '10px 0 10px 0',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Button
            onClick={profitability_modal}
            sx={{ backgroundColor: '#b85c91' }}
            size="small"
            color="secondary"
            fullWidth
            variant="contained"
            disabled={!pvalue ? true : false}
          >
            Profitability Calculator
          </Button>

          {!isLogin && (
            <Typography variant="body2"> ({pvalue} Left)</Typography>
          )}
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
            disabled={!rvalue ? true : false}
          >
            Review Analyzer
          </Button>
          {!isLogin && (
            <Typography variant="body2"> ({rvalue} Left)</Typography>
          )}
        </Box>
        <Box
          sx={{
            width: '81%',
            justifyContent: 'center',
            m: '10px 0 10px 0',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Button
            onClick={keywordResearch}
            sx={{ backgroundColor: '#b85c91' }}
            size="small"
            color="secondary"
            fullWidth
            variant="contained"
          >
            Keyword Research
          </Button>
        </Box>
        <Box
          sx={{
            width: '81%',
            justifyContent: 'center',
            m: '10px 0 10px 0',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            backgroundColor: 'red',
            borderRadius: '5px',
          }}
        >
          { (isNotCollected) && (
            <Typography variant="body2" color="#ffffff">
              {' '}
              Please Login to use this feature.
            </Typography>
          )}
          { (!pvalue || !rvalue) && (
            <Typography variant="body2" color="#ffffff">
              {' '}
              Create a free account to use more.
            </Typography>
          )}
          {flipPage && (
            <Typography variant="body2" color="#ffffff">
              {' '}
              Please visit a Flipkart product page.
            </Typography>
          )}
          {!isLogin && (
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
          )}
        </Box>
      </Box>
      <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent:'center',
            cursor: 'pointer',
          }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent:'center',
            cursor: 'pointer',
            backgroundColor: '#b85c91',
            borderRadius: '5px',
            width:'100%',
            marginTop:"10px",
            height: '30px',
          }}
          onClick={collection}
        >
          <img src={save} alt="save" width="auto" height="35px" />
          {!collected && (
            <Typography variant="body2" color="white">
              {' '}
              Start Monitoring This Product{' '}
            </Typography>
          )}
          {collected && (
            <Typography variant="body2" color="white">
              {' '}
              Product Added Visit Datavio to Monitor{' '}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Popup;
