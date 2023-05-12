export const constants = {
  API_URL: 'http://localhost:3000/',
  PRODUCT_API_URL: 'http://localhost:4000/backend/',
  referrerIdKey: 'dv_referrer_id',
  authTokenKey: 'dv_authToken',
};

export function getAuthToken() {
  return chrome.storage.local.get([constants.authTokenKey]);
}

export function getReferrerIdKey() {
  return chrome.storage.local.get([constants.referrerIdKey]);
}
