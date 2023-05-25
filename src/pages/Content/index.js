import createProfitabiltyModal from './modules/profitabiltyModal.js';
import reviewNewModal from './modules/reviewModal.js';
import scrapePCData from './modules/scrapers/pcScraper.js';
import { pcFirstTimeUpdator } from './modules/valueUpdators/pc.js';
import getListingData from './modules/scrapers/listingScraper.js';
import './content.styles.css';
import ListingModal from './modules/listingHealthScore.js';

//console.log('content script loaded');
const observer = new MutationObserver(async (mutationsList, observer) => {
  // Check each mutation in the list
  for (const mutation of mutationsList) {
    // Check if any new nodes are added
    if (mutation.type === 'childList') {
      // Check if the desired element is now available
      const testElement = document.querySelector("#container > div > div._331-kn > div")

      const desiredElement = document.querySelector(
        '#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-5-12._78xt5Y > div:nth-child(1)'
      );
      if (testElement) {
        // Perform your desired action
        //console.log('Desired element found:', desiredElement);
        // Stop observing mutations once the element is found (if needed)
        observer.disconnect();
        getListingData();
        const listingHealthScore = document.createElement('div');
        listingHealthScore.setAttribute('id', 'listingHealthScore');
        listingHealthScore.appendChild(await ListingModal());

        desiredElement.prepend(listingHealthScore);
        break;
        // You can also perform additional actions here
        // Now that you have access to the desired element, you can manipulate it
      }
    }
  }
});

// Start observing mutations in the document body or any desired parent element
observer.observe(document.body, { childList: true, subtree: true });
chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  const currentUrl = window.location.href;
  if (currentUrl.includes('flipkart.com')) {
    if (request.type === 'profitability_modal') {
      const alreadyExists = document.getElementById('profitability-modal');
      if (alreadyExists) {
        // remove the modal
        alreadyExists.remove();
      }
      const key = `${currentUrl}_dv_pc`;
      let scrapedData = await chrome.storage.local.get(key);

      if (!scrapedData[key]) {
        scrapedData = scrapePCData();
        await chrome.storage.local.set({ [key]: scrapedData });
      }

      const profitabilityModal = await createProfitabiltyModal(key);
      document.body.appendChild(profitabilityModal);
      pcFirstTimeUpdator(key);
    } else if (request.type === 'review_modal') {
      const alreadyExists = document.getElementById('review-modal');
      if (alreadyExists) {
        // remove the modal
        alreadyExists.remove();
      }

      const modal = document.createElement('div');
      modal.setAttribute('id', 'review-modal');
      document.body.appendChild(modal);

      modal.setAttribute('class', 'ivkkEA jIfStg');

      const modalClass1 = document.createElement('div');
      modalClass1.setAttribute('class', 'doWCWF');
      modal.appendChild(modalClass1);

      const modalClass2 = document.createElement('div');
      modalClass2.setAttribute('class', 'oeMFGH');
      modalClass1.appendChild(modalClass2);

      const header = document.createElement('div');
      header.setAttribute('class', 'bAWFlm');
      header.innerText = 'Reviews Analyser';

      const closeModal = document.createElement('span');
      closeModal.setAttribute('id', 'closeModal');
      closeModal.setAttribute('class', 'close');
      closeModal.innerHTML = '&times;';
      closeModal.onclick = function () {
        const alreadyExists = document.getElementById('review-modal');
        if (alreadyExists) {
          // remove the modal
          alreadyExists.remove();
        }
      };

      // body
      const body = document.createElement('div');
      body.setAttribute('class', 'jbqSrN');
      header.appendChild(closeModal);
      modalClass2.appendChild(header);
      modalClass2.appendChild(body);

      const loading = document.createElement('div');
      loading.setAttribute('class', 'sk-chase');
      loading.innerHTML =
        '<div class="sk-chase-dot"></div><div class="sk-chase-dot"></div><div class="sk-chase-dot"></div><div class="sk-chase-dot"></div><div class="sk-chase-dot"></div><div class="sk-chase-dot"></div>';
      body.appendChild(loading);

      const newDiv = await reviewNewModal();
      body.removeChild(loading);
      body.appendChild(newDiv);
    }
  } else {
    // alert not a flipkart product page
    alert(
      'Please open a Flipkart product page. Current page is not a valid Flipkart product page'
    );
  }
  sendResponse({test:true});
});
