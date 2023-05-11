import createProfitabiltyModal from './modules/profitabiltyModal.js';
import reviewNewModal from './modules/reviewModal.js';
import scrapePCData from './modules/scrapers/pcScraper.js';
import { pcFirstTimeUpdator } from './modules/valueUpdators/pc.js';
import './content.styles.css';

console.log('content script loaded');
const observer = new MutationObserver((mutationsList, observer) => {
  // Check each mutation in the list
  for (const mutation of mutationsList) {
    // Check if any new nodes are added
    if (mutation.type === 'childList') {
      // Check if the desired element is now available
      const desiredElement = document.querySelector(
        '#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg'
      );
      if (desiredElement) {
        // Perform your desired action
        console.log('Desired element found:', desiredElement);
        // Stop observing mutations once the element is found (if needed)
        observer.disconnect();
        const listingHealthScore = document.createElement('div');
        listingHealthScore.setAttribute('id', 'listingHealthScore');
        listingHealthScore.textContent = 'New Div';
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
      document.body
        .querySelector('#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg')
        .prepend(listingHealthScore);
      document.body.appendChild(profitabilityModal);
      pcFirstTimeUpdator(key);
    } else if (request.type === 'review_modal') {
      const alreadyExists = document.getElementById('review-modal');
      if (alreadyExists) {
        // remove the modal
        alreadyExists.remove();
      }
      document.body.appendChild(await reviewNewModal());
    }
  } else {
    // alert not a flipkart product page
    alert(
      'Please open a Flipkart product page. Current page is not a valid Flipkart product page'
    );
  }
});
