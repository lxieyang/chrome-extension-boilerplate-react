// import { printLine } from './modules/print';

// console.log('Content script works!');
// console.log('Must reload extension for modifications to take effect.');

// printLine("Using the 'printLine' function from the Print Module");
import createProfitabiltyModal from './modules/profitabiltyModal.js';
import reviewModal from './modules/reviewModal.js';
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
      //     const browser = await puppeteer.launch({
      //       headless: true,
      //       userDataDir: '/path/to/user/data/directory',
      //     });
      //     const page = await browser.newPage();
      //     await page.goto('https://www.chumbak.com/');
      //     const data = await page.evaluate(() => {
      //       // Perform the necessary parsing and return the data as an object
      //       exp = document.getElementsByClassName('Heading u-h5')[6].innerText;
      //       const data = { exp };
      //       // ...
      //       return data;
      //     });
      //     chrome.runtime.sendMessage({ type: 'dom_content', data });
      //     // Close the headless browser
      //     await browser.close();
      // getActiveTabURL().then((tab) => {
      // if (tab.url.includes('flipkart.com')) {
      // save scraped data in chrome storage with key as product url
      // chrome.storage.sync.set({ [tab.url]: 'data' });
      // add
      // <div id="modal" class="modal">
      //     <div class="modal-content">
      //     <span id="closeModal" class="close">&times;</span>
      //     <p>Some data in the popup panel.</p>
      //   </div>
      // </div>
      // in the body of the document
      // console.log('yeah');
      const alreadyExists = document.getElementById('profitability-modal');
      if (alreadyExists) {
        // remove the modal
        alreadyExists.remove();
      }
      const key = `${currentUrl}_dv_pc`;
      let scrapedData = await chrome.storage.local.get(key);
      console.log(scrapedData);
      if (!scrapedData[key]) {
        scrapedData = scrapePCData();
        await chrome.storage.local.set({ [key]: scrapedData });
      } else {
        console.log('already exists', scrapedData);
      }

      const profitabilityModal = await createProfitabiltyModal(key);

      document.body.appendChild(profitabilityModal);
      pcFirstTimeUpdator(key);
    } else if (request.type === 'review_modal') {
      console.log('yeah');
      const alreadyExists = document.getElementById('review-modal');
      if (alreadyExists) {
        // remove the modal
        alreadyExists.remove();
      }
      document.body.appendChild(reviewModal);
    }
  } else {
    // alert not a flipkart product page
    alert(
      'Please open a Flipkart product page. Current page is not a valid Flipkart product page'
    );
  }
  // window.onclick = function (event) {
  //   if (event.target === modal) {
  //     modal.style.display = 'flex';
  //   }
  // };
  // });
  // }
});

// if (module.hot) module.hot.accept();
