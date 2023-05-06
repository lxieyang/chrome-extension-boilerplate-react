import React from 'react';
import logo from '../../assets/img/logo.svg';
import { getAuthToken, constants, getReferrerIdKey } from './utils.js';
import { v4 as uuidv4 } from 'uuid';
import { Button, DatePicker, Space, version } from 'antd';
import 'antd/dist/reset.css';
import './Popup.css';

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
    <div className="App">
      <header className="App-header"></header>
      <Button type="primary" onClick={profitability_modal}>
        Profitability Calculator
      </Button>
      <Space direction="vertical" size={12}>
        {' '}
      </Space>
      <Button type="primary" onClick={review_modal}>
        Analyse Review
      </Button>
      <Button type="primary" onClick={refresh_token}>
        {' '}
        Refresh
      </Button>
    </div>
  );
};

export default Popup;
