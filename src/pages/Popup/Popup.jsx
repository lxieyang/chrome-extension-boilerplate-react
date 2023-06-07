import React from 'react';
import logo from '../../assets/img/logo.png';
import save from '../../assets/img/save.png';
import { Box, Button, Switch, Typography } from '@mui/material';
import {
  getAuthToken,
  constants,
  getReferrerIdKey,
  urlGenerator,
  urlChecker,
} from './utils.js';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

const Popup = () => {
  const [pvalue, setPvalue] = useState(2);
  const [rvalue, setRvalue] = useState(2);
  const [flipPage, setFlipPage] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [collected, setCollected] = useState(false);
  const [isNotCollected, setIsNotCollected] = useState(false);

  const TestReferrerId = async () => {
    let referrerIdValue = await getReferrerIdKey();
    if (!referrerIdValue || !referrerIdValue[constants.referrerIdKey]) {
      chrome.storage.local.set({
        [constants.referrerIdKey]: `TEST${uuidv4()}`,
      });
    }
  };

  TestReferrerId(); // Comment this in production.

  const clickCount = async (key) => {
    const authToken = await getAuthToken();
    let url = `${constants.PRODUCT_API_URL}extension/click-count`;
    let body = {};
    body[key] = true;
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
    let authToken = await getAuthToken();
    if (!authToken || !authToken[constants.authTokenKey]) {
      if (field.referrerId === '') {
        let referrerIdValue = await getReferrerIdKey();
        let uuid =
          referrerIdValue && referrerIdValue[constants.referrerIdKey]
            ? referrerIdValue[constants.referrerIdKey]
            : uuidv4();
        if (!referrerIdValue || !referrerIdValue[constants.referrerIdKey]) {
          chrome.storage.local.set({ [constants.referrerIdKey]: uuid });
        }
        field.referrerId = uuid;
      }
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
    }
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
        useCount[constants.profitabiltyUseCountKey] % 2 === 0 &&
        authToken[constants.authTokenKey]
      ) {
        clickCount('profitability');
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
        let body = { profitability: true, referrerId: '' };
        anonymousUsageTracker(body);
      } else {
        setPvalue(0);
      }
    } else {
      let body = { wrongFlipkartPage: true, referrerId: '' };
      anonymousUsageTracker(body);
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
        useCount[constants.reviewUseCountKey] % 2 === 0 &&
        authToken[constants.authTokenKey]
      ) {
        clickCount('review');
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
        chrome.storage.local.set({ overview: 'undefined' });
        chrome.storage.local.set({ allreview: 'undefined' });
        chrome.storage.local.set({ wordcloud: 'undefined' });
        chrome.storage.local.set({ chatgpt: 'undefined' });
        chrome.runtime.sendMessage({ message: 'review_modal' });
        counter();
        let body = { review: true, referrerId: '' };
        anonymousUsageTracker(body);
      } else {
        // show to free login
        setRvalue(0);
      }
    } else {
      let body = { wrongFlipkartPage: true, referrerId: '' };
      anonymousUsageTracker(body);
      setFlipPage(true);
    }
  }
  async function signUp() {
    chrome.runtime.sendMessage({message:'Register', key: 'signUpCount', track: true})
  }

  async function keywordResearch() {
    chrome.runtime.sendMessage({message:'Register', key: 'keywordCount', track: true});
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
    let isFlipPage = await urlChecker();
    if (!isFlipPage) {
      setFlipPage(true);
    }
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

  const redirectToHome = async () => {
    chrome.tabs.create({
      url: `${constants.API_URL}`,
      active: true,
    });
  };

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
          <Box
            sx={{ alignItems: 'center', cursor: 'pointer' }}
            onClick={redirectToHome}
          >
            <img
              style={{ margin: '2px 10px 0 0' }}
              src={logo}
              alt="Datavio"
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
            disabled={!rvalue || flipPage ? true : false}
          >
            AI Review Analyzer
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
            disabled={flipPage ? true : false}
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
          }}
        >
          <Button
            onClick={profitability_modal}
            sx={{ backgroundColor: '#b85c91' }}
            size="small"
            color="secondary"
            fullWidth
            variant="contained"
            disabled={!pvalue || flipPage ? true : false}
          >
            Profitability Calculator
          </Button>

          {!isLogin && (
            <Typography variant="body2"> ({pvalue} Left)</Typography>
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
            backgroundColor: '#7828f0',
            borderRadius: '5px',
          }}
        >
          {isNotCollected && (
            <Typography variant="body2" color="#ffffff">
              {' '}
              Please Login to use this feature.
            </Typography>
          )}
          {(!pvalue || !rvalue) && (
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
              Free Login / Sign up
            </Button>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backgroundColor: '#b85c91',
            borderRadius: '5px',
            width: '100%',
            marginTop: '10px',
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
