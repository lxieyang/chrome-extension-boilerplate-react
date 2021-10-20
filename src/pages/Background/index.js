import { set, get } from './../../storage';

// both storage.local and sync works

console.log('This is the background page.');
console.log('Put the background scripts here.');

chrome.storage.sync.set({ key: 'test' }, function () {
  console.log('Value is set to ' + 'test');
});

chrome.storage.sync.set({ json: { list: ['list', 'list2'] } }, function () {
  console.log('json saved');
});

chrome.storage.sync.get(['key'], (ret) =>
  console.log('Value is get ' + JSON.stringify(ret))
);

chrome.storage.sync.get(null, (ret) =>
  console.log('Value get all ' + JSON.stringify(ret))
);
