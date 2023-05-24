import { getActiveTabURL } from '../utils';

export const constants = {
  API_URL: 'https://app.datavio.co/',
  PRODUCT_API_URL: 'https://app.datavio.co/backend/',
  referrerIdKey: 'dv_referrer_id',
  authTokenKey: 'dv_authToken',
  profitabiltyUseCountKey: 'dv_pc_use_count',
  reviewUseCountKey: 'dv_review_use_count',
};

export function getAuthToken() {
  return chrome.storage.local.get([constants.authTokenKey]);
}

export function getReferrerIdKey() {
  return chrome.storage.local.get([constants.referrerIdKey]);
}

export async function urlGenerator() {
  let url = await getActiveTabURL();
  url = url.url;
  let newUrl = '';
  let bool = false;
  for (let i = 2; i < url.length; i++) {
    if (bool === true) {
      newUrl += url[i];
    }
    if (url[i - 2] === 'c' && url[i - 1] === 'o' && url[i] === 'm') {
      bool = true;
    }
    if (url[i + 1] === '/' && url[i + 2] === 'p' && url[i + 3] === '/') {
      newUrl += '/product-reviews/';
      i += 3;
    }
    if (
      url[i + 1] === '&' &&
      url[i + 2] === 'm' &&
      url[i + 3] === 'a' &&
      url[i + 4] === 'r'
    ) {
      break;
    }
  }

  return newUrl;
}

export async function urlChecker() {
  let url = await getActiveTabURL();
  url = url.url;
  let bool = false;
  for (let i = 2; i < url.length; i++) {
    if (url[i + 1] === '/' && url[i + 2] === 'p' && url[i + 3] === '/') {
      bool = true;
      break;
    }
  }

  return bool;
}
