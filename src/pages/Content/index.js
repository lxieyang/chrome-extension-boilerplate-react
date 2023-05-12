import createProfitabiltyModal from './modules/profitabiltyModal.js';
import reviewNewModal from './modules/reviewModal.js';
import scrapePCData from './modules/scrapers/pcScraper.js';
import { pcFirstTimeUpdator } from './modules/valueUpdators/pc.js';
import getListingData from './modules/scrapers/listingScraper.js';
import './content.styles.css';
import ListingModal from './modules/listingHealthScore.js';

console.log('content script loaded');
const observer = new MutationObserver(async (mutationsList, observer) => {
  // Check each mutation in the list
  for (const mutation of mutationsList) {
    // Check if any new nodes are added
    if (mutation.type === 'childList') {
      // Check if the desired element is now available
      const desiredElement = document.querySelector("#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-5-12._78xt5Y > div:nth-child(1)"
      );
      if (desiredElement) {
        // Perform your desired action
        console.log('Desired element found:', desiredElement);
        // Stop observing mutations once the element is found (if needed)
        observer.disconnect();
        getListingData();
        const listingHealthScore = document.createElement('div');
        listingHealthScore.setAttribute('id', 'listingHealthScore');
        listingHealthScore.appendChild(await ListingModal())
        
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
      document.body.appendChild(await reviewNewModal());
    }
  } else {
    // alert not a flipkart product page
    alert(
      'Please open a Flipkart product page. Current page is not a valid Flipkart product page'
    );
  }
});
