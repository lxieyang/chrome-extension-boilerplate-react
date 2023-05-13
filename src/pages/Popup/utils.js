export const constants = {
  API_URL: 'https://www.datavio.co/',
  PRODUCT_API_URL: 'https://www.datavio.co/backend/',
  referrerIdKey: 'dv_referrer_id',
  authTokenKey: 'dv_authToken',
  profitabiltyUseCountKey: 'dv_pc_use_count',
  reviewUseCountKey: 'dv_review_use_count',
};

export function getAuthToken() {
  return chrome.storage.sync.get([constants.authTokenKey]);
}

export function getReferrerIdKey() {
  return chrome.storage.local.get([constants.referrerIdKey]);
}
