import createScroller from './profitabiltyCalculator.js';
import pcUpdater from './valueUpdators/pc.js';

const createProfitabiltyModal = async (url) => {
  const modal = document.createElement('div');
  modal.setAttribute('id', 'profitability-modal');
  modal.setAttribute('class', 'modal');

  const modalHeader = document.createElement('div');
  modalHeader.setAttribute('class', 'modal-header');
  // const modalHeaderText = document.createElement('p');
  // modalHeaderText.innerText = 'Some data in the popup panel.';
  modalHeader.innerText = 'Profitability Calculator';

  const closeModal = document.createElement('span');
  closeModal.setAttribute('id', 'closeModal');
  closeModal.setAttribute('class', 'close');
  closeModal.innerHTML = '&times;';
  closeModal.onclick = function () {
    const alreadyExists = document.getElementById('profitability-modal');
    if (alreadyExists) {
      // remove the modal
      chrome.storage.local.remove(url);
      alreadyExists.remove();
    }
  };

  const contentTop = document.createElement('div');
  contentTop.setAttribute('class', 'lefeKT');

  const fulfilmentDiv = document.createElement('div');
  fulfilmentDiv.setAttribute('class', 'gbxfwG');

  const fulfilmentType1 = document.createElement('div');
  fulfilmentType1.setAttribute('class', 'jdmMww');
  fulfilmentType1.innerHTML = 'Flipkart Fulfillment';
  const fulfilmentType2 = document.createElement('div');
  fulfilmentType2.setAttribute('class', 'bvLLT');
  fulfilmentType2.innerHTML = 'Smart Fulfillment';

  const fulfilmentType3 = document.createElement('div');
  fulfilmentType3.setAttribute('class', 'bvLLT');
  fulfilmentType3.innerHTML = 'Seller Fulfillment';

  fulfilmentDiv.appendChild(fulfilmentType1);
  fulfilmentDiv.appendChild(fulfilmentType2);
  fulfilmentDiv.appendChild(fulfilmentType3);

  contentTop.appendChild(fulfilmentDiv);

  modalHeader.appendChild(closeModal);

  //  create profitability calculator footer
  const footer = document.createElement('div');
  footer.setAttribute('id', 'profitability-calculator-footer');
  footer.setAttribute('class', 'kizSZB');

  const netDiv = document.createElement('div');
  netDiv.setAttribute('id', 'profitability-calculator-footer-netDiv');
  netDiv.setAttribute('class', 'gpuHtG');
  const netDivText = document.createElement('div');
  netDivText.setAttribute('class', 'hUvleg');
  netDivText.innerText = 'Net';
  const netDivValue = document.createElement('div');
  netDivValue.setAttribute('id', 'profitability-calculator-footer-netDivValue');
  netDivValue.setAttribute('class', 'jXiauJ');
  netDivValue.innerText = '₹ 1,000';
  netDiv.appendChild(netDivText);
  netDiv.appendChild(netDivValue);

  const netMargin = document.createElement('div');
  netMargin.setAttribute('class', 'gpuHtG');
  const netMarginText = document.createElement('div');
  netMarginText.setAttribute('class', 'hUvleg');
  netMarginText.innerText = 'Margin';
  const netMarginValue = document.createElement('div');
  netMarginValue.setAttribute(
    'id',
    'profitability-calculator-footer-marginDivValue'
  );
  netMarginValue.setAttribute('class', 'jXiauJ');
  netMarginValue.innerText = '53%';
  netMargin.appendChild(netMarginText);
  netMargin.appendChild(netMarginValue);

  const netRoi = document.createElement('div');

  netRoi.setAttribute('class', 'gpuHtG');
  const netRoiText = document.createElement('div');
  netRoiText.setAttribute('class', 'hUvleg');
  netRoiText.innerText = 'Net ROI';
  const netRoiValue = document.createElement('div');
  netRoiValue.setAttribute('id', 'profitability-calculator-footer-netRoiValue');
  netRoiValue.setAttribute('class', 'jXiauJ');
  netRoiValue.innerText = '153%';
  netRoi.appendChild(netRoiText);
  netRoi.appendChild(netRoiValue);

  footer.appendChild(netDiv);
  footer.appendChild(netMargin);
  footer.appendChild(netRoi);

  modal.appendChild(modalHeader);
  modal.appendChild(contentTop);
  const Scroller = await createScroller(url);
  modal.appendChild(Scroller);
  modal.appendChild(footer);
  modal.style.display = 'flex';
  modal.style.zIndex = 99;
  fulfilmentType1.onclick = async function () {
    fulfilmentType1.removeAttribute('class');
    fulfilmentType2.removeAttribute('class');
    fulfilmentType3.removeAttribute('class');
    fulfilmentType1.setAttribute('class', 'jdmMww');
    fulfilmentType2.setAttribute('class', 'bvLLT');
    fulfilmentType3.setAttribute('class', 'bvLLT');

    let scrapedData = await chrome.storage.local.get(url);
    scrapedData = scrapedData[url];
    scrapedData['sellerChannel'] = 'Flipkart';
    await chrome.storage.local.set({ [url]: scrapedData });
    pcUpdater(url);
  };
  fulfilmentType2.onclick = async function () {
    fulfilmentType1.removeAttribute('class');
    fulfilmentType2.removeAttribute('class');
    fulfilmentType3.removeAttribute('class');
    fulfilmentType1.setAttribute('class', 'bvLLT');
    fulfilmentType2.setAttribute('class', 'jdmMww');
    fulfilmentType3.setAttribute('class', 'bvLLT');
    let scrapedData = await chrome.storage.local.get(url);
    scrapedData = scrapedData[url];
    scrapedData['sellerChannel'] = 'Smart';
    await chrome.storage.local.set({ [url]: scrapedData });
    pcUpdater(url);
  };
  fulfilmentType3.onclick = async function () {
    fulfilmentType1.removeAttribute('class');
    fulfilmentType2.removeAttribute('class');
    fulfilmentType3.removeAttribute('class');
    fulfilmentType1.setAttribute('class', 'bvLLT');
    fulfilmentType2.setAttribute('class', 'bvLLT');
    fulfilmentType3.setAttribute('class', 'jdmMww');
    let scrapedData = await chrome.storage.local.get(url);
    scrapedData = scrapedData[url];
    scrapedData['sellerChannel'] = 'Self-Ship';
    await chrome.storage.local.set({ [url]: scrapedData });
    pcUpdater(url);
  };
  return modal;
};

export default createProfitabiltyModal;
