import createProfitabiltyModal from './modules/profitabiltyModal.js';
import reviewNewModal from './modules/reviewModal.js';
import scrapePCData from './modules/scrapers/pcScraper.js';
import { pcFirstTimeUpdator } from './modules/valueUpdators/pc.js';
import './content.styles.css';

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
