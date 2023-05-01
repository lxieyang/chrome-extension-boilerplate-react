import { round2Decimals } from '../utils.js';
export const pcFirstTimeUpdator = async (url) => {
  pcUpdater(url, { firstTime: true });
};

const pcUpdater = async (url, options) => {
  const fixedFeeTable = {
    300: 13,
    500: 11,
    1000: 24,
  };
  let scrapedData = await chrome.storage.local.get(url);
  scrapedData = scrapedData[url];
  const price = scrapedData['price'];
  const length = scrapedData['length'] || 10;
  const breadth = scrapedData['breadth'] || 10;
  const height = scrapedData['height'] || 10;
  const weight = scrapedData['weight'] || 1;
  const sellerChannel = scrapedData['sellerChannel'] || 'Flipkart';
  const sellerType = scrapedData['sellerType'] || 'BRONZE';
  const shippingType = scrapedData['shippingType'] || 'LOCAL';
  const manufacturingCost =
    scrapedData['manufacturingCost'] || (30 * price) / 100;
  const commissionFee = scrapedData['commissionFee'] || 200;
  // if (options && options.firstTime) {
  // }
  const volumetricWeight = (length * breadth * height) / 5000;
  const finalWeight = Math.max(weight, volumetricWeight);
  console.log(commissionFee);
  let shippingCost = 50;
  if (sellerType === 'SILVER') {
    shippingCost = (90 * shippingCost) / 100;
  } else if (sellerType === 'GOLD') {
    shippingCost = (80 * shippingCost) / 100;
  }

  // collection fee is 2% of price
  const collectionFee = (price * 2) / 100;

  let pickAndPackFee = 0;
  if (sellerChannel === 'Flipkart') {
    if (weight <= 1) {
      pickAndPackFee = 14;
    } else {
      pickAndPackFee = 14 + Math.ceil(weight - 1) * 5;
    }
  }

  // Fixed fee
  let fixedFee = 47;
  if (price <= 300) {
    fixedFee = fixedFeeTable[300];
  } else if (price <= 500) {
    fixedFee = fixedFeeTable[500];
  } else if (price <= 1000) {
    fixedFee = fixedFeeTable[1000];
  }
  const marketplaceFee =
    collectionFee + fixedFee + shippingCost + commissionFee;
  console.log('collectionFee', collectionFee);
  console.log('fixedFee', fixedFee);
  console.log('marketplaceFee', marketplaceFee);
  console.log('shippingCost', shippingCost);
  const gst = (marketplaceFee * 18) / 100;
  console.log('gst', gst);
  const net = price - manufacturingCost - marketplaceFee - pickAndPackFee - gst;
  const margin = (net * 100) / price;
  const roi = (net * 100) / manufacturingCost;
  console.log(commissionFee);
  // update document
  const doc = document.getElementById('profitability-modal');
  doc.querySelector('#price-div').querySelector('input').value = price;
  doc.querySelector('#dimensions-div').querySelectorAll('input')[0].value =
    length;
  doc.querySelector('#dimensions-div').querySelectorAll('input')[1].value =
    breadth;
  doc.querySelector('#dimensions-div').querySelectorAll('input')[2].value =
    height;
  doc.querySelector('#weight-div').querySelector('input').value = weight;
  if (options && options.firstTime) {
    doc.querySelector('#manufacting-cost-div').querySelector('input').value =
      Math.floor(manufacturingCost);
  }

  doc.querySelector('#fixed-fee-div').querySelector('b').innerText = fixedFee;
  console.log('commissionFee', commissionFee);
  doc.querySelector('#commission-fee-div').querySelector('input').value =
    commissionFee;
  doc.querySelector('#pick-and-pack').querySelector('b').innerText =
    pickAndPackFee;
  doc.querySelector('#collection-fee-div').querySelector('b').innerText =
    collectionFee;
  doc.querySelector('#shipping-type-div').querySelector('b').innerText =
    round2Decimals(shippingCost);
  doc.querySelector('#gst-tax').querySelector('b').innerText =
    round2Decimals(gst);
  doc.querySelector(
    '#profitability-calculator-footer-netDivValue'
  ).innerText = `₹ ${round2Decimals(net)}`;
  doc.querySelector(
    '#profitability-calculator-footer-marginDivValue'
  ).innerText = `${round2Decimals(margin)} %`;
  doc.querySelector(
    '#profitability-calculator-footer-netRoiValue'
  ).innerText = `${round2Decimals(roi)} %`;
};

export default pcUpdater;
