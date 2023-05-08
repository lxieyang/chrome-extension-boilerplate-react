import React from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import { Button, DatePicker, Space, version } from 'antd';
import 'antd/dist/reset.css';
import './Popup.css';

const Popup = () => {
  function profitability_modal() {
    chrome.runtime.sendMessage({ message: 'profitability_modal' });
  }
  function review_modal() {
    chrome.runtime.sendMessage({ message: 'review_modal' });
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
    </div>
  );
};

export default Popup;
