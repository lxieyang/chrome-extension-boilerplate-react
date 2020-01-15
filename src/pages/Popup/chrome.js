import { useState, useEffect } from 'react';

export const currentTab = (callback) =>
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) =>
    callback(tabs[0])
  );
export const sendMessage = (message) =>
  currentTab((tab) => chrome.tabs.sendMessage(tab.id, message));

export const useStorage = ({ storage = 'local', key }, callback) => {
  const [value, setValue] = useState();
  useEffect(() => {
    chrome.storage[storage].get([key], (result) => {
      setValue(result[key]);
      if (callback) callback(result[key]);
    });
  }, []);
  return value;
};

export const useBlacklist = () => {
  const list = useStorage({ storage: 'sync', key: 'blacklist' });
  return list ? list.split('\n').filter((n) => !!n) : [];
};
