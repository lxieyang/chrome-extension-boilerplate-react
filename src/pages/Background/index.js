import { urlGenerator, constants, getReferrerIdKey } from "../Popup/utils";


const anonymousUsageTracker = async (field) => {
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



async function reviewModal() {
  let updatedUrl = await urlGenerator();
  //console.log(updatedUrl);
  let url = `${constants.API_URL}api/ratings-reviews`;
  let body = { url: `${updatedUrl}` };
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  let data = await response.json()
  chrome.storage.local.set({"overview":data});
}

async function allReviewData(filterData) {
  let updatedUrl = await urlGenerator();
  let url = `${constants.API_URL}api/get-reviews`;
  let body = {
    url: `${updatedUrl}&marketplace=FLIPKART`,
    conditions: filterData,
  };
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  let data = await response.json()
  chrome.storage.local.set({"allreview":data});
}

async function wordcloudgenerator() {
  let updatedUrl = await urlGenerator();
  let url = `${constants.API_URL}api/review-analysis`;
  let body = {
    url: `${updatedUrl}`,
  };
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  let data = await response.json()
  chrome.storage.local.set({"wordcloud":data});
}


chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  if (
    request.message === 'profitability_modal' ||
    request.message === 'review_modal'
  ) {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      // await new Promise(resolve => setTimeout(resolve, 1000));

      chrome.tabs.sendMessage(tabs[0].id, {
        type: request.message,
      });
    });
  }
  if(request.message === 'review_modal'){
    allReviewData([]);
    wordcloudgenerator();
    reviewModal();
  }
  if(request.message === "filterData")
  {
    //console.log(await request.data);
    allReviewData(request.data)
  }
  if(request.message === "Register")
  {
    let referrerIdValue = await getReferrerIdKey();
    let uuid = referrerIdValue[constants.referrerIdKey];
    let body = { aiReview: true, referrerId: uuid};
    anonymousUsageTracker(body);
    chrome.tabs.create({
      url: `${constants.API_URL}register?referrer=extension&referrerId=${uuid}`,
      active: true,
    });
  }
  sendResponse({test:true});
});
