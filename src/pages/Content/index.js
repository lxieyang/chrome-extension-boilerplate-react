import createProfitabiltyModal from './modules/profitabiltyModal.js';
import reviewNewModal from './modules/reviewModal.js';
import scrapePCData from './modules/scrapers/pcScraper.js';
import { pcFirstTimeUpdator } from './modules/valueUpdators/pc.js';
import getListingData from './modules/scrapers/listingScraper.js';
import './content.styles.css';
import ListingModal from './modules/listingHealthScore.js';
import Jumper from './modules/jumper.js'
import KeywordModal from './modules/tempKeywordAnalysis.js'

//console.log('content script loaded');
const observer = new MutationObserver(async (mutationsList, observer) => {
  // Check each mutation in the list
  for (const mutation of mutationsList) {
    // Check if any new nodes are added
    if (mutation.type === 'childList') {
      // Check if the desired element is now available
      const testElement = document.querySelector("#container > div > div._331-kn > div")
      const desiredElement = document.querySelector("#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg");
      if (testElement && desiredElement) {
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

const observer2 = new MutationObserver(async (mutationsList, observer2) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {

      const allpagedesiredelement = document.querySelector("#container > div > div._1kfTjk");
      const testElement = document.querySelector("#container > div > div._6t1WkM._3HqJxg > div:nth-child(2) > div > div._2t2dSp")
      const testElement2 = document.querySelector("#container > div > div._331-kn > div")

      if (allpagedesiredelement && (testElement || testElement2)) {
      observer2.disconnect();

      const datavioJumper = document.createElement('div');
      datavioJumper.setAttribute('class', 'jumper');
      datavioJumper.innerHTML=`<?xml version="1.0" encoding="UTF-8"?> <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 20 20" version="1.1"> <g id="surface1"> <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 0.15625 8.75 C 0.15625 5.832031 0.15625 2.996094 0.15625 0.15625 C 6.824219 0.15625 13.488281 0.15625 20.15625 0.15625 C 20.15625 6.824219 20.15625 13.488281 20.15625 20.15625 C 13.488281 20.15625 6.824219 20.15625 0.15625 20.15625 C 0.15625 16.378906 0.15625 12.605469 0.15625 8.75 M 12.8125 11.328125 C 13.007812 11.632812 13.199219 11.933594 13.421875 12.28125 C 15.339844 8.972656 17.199219 5.765625 19.089844 2.5 C 18.515625 2.5 18.046875 2.464844 17.585938 2.515625 C 17.382812 2.539062 17.128906 2.707031 17.023438 2.882812 C 16.292969 4.113281 15.597656 5.363281 14.886719 6.609375 C 14.410156 7.441406 13.929688 8.269531 13.433594 9.136719 C 12.125 6.878906 10.871094 4.707031 9.613281 2.535156 C 9.042969 2.535156 8.464844 2.535156 7.804688 2.535156 C 8.246094 3.316406 8.648438 4.039062 9.054688 4.757812 C 10.277344 6.917969 11.503906 9.082031 12.8125 11.328125 M 12.035156 14.628906 C 12.292969 14.195312 12.589844 13.777344 12.792969 13.320312 C 12.882812 13.113281 12.882812 12.777344 12.773438 12.582031 C 10.941406 9.355469 9.089844 6.136719 7.21875 2.929688 C 7.105469 2.734375 6.824219 2.53125 6.609375 2.519531 C 5.734375 2.472656 4.859375 2.5 3.878906 2.5 C 4.144531 2.960938 4.328125 3.382812 4.609375 3.71875 C 4.761719 3.90625 5.183594 4.109375 5.316406 4.03125 C 5.921875 3.660156 6.175781 4.097656 6.386719 4.464844 C 8.023438 7.339844 9.636719 10.230469 11.253906 13.105469 C 10.878906 13.695312 10.589844 14.332031 10.140625 14.824219 C 9.25 15.800781 9.179688 16.734375 10.027344 17.738281 C 10.054688 17.773438 10.113281 17.785156 10.1875 17.824219 C 10.800781 16.796875 11.414062 15.769531 12.035156 14.628906 M 2.429688 4.539062 C 3.285156 6.039062 4.136719 7.542969 5 9.042969 C 6.183594 11.109375 7.375 13.171875 8.574219 15.226562 C 8.640625 15.339844 8.859375 15.476562 8.953125 15.441406 C 9.40625 15.277344 9.761719 13.960938 9.503906 13.511719 C 7.394531 9.84375 5.289062 6.175781 3.1875 2.519531 C 2.554688 2.519531 1.941406 2.519531 1.230469 2.519531 C 1.625 3.203125 1.984375 3.828125 2.429688 4.539062 Z M 2.429688 4.539062 "/> <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 12.769531 11.285156 C 11.503906 9.082031 10.277344 6.917969 9.054688 4.757812 C 8.648438 4.039062 8.246094 3.316406 7.804688 2.535156 C 8.464844 2.535156 9.042969 2.535156 9.613281 2.535156 C 10.871094 4.707031 12.125 6.878906 13.433594 9.136719 C 13.929688 8.269531 14.410156 7.441406 14.886719 6.609375 C 15.597656 5.363281 16.292969 4.113281 17.023438 2.882812 C 17.128906 2.707031 17.382812 2.539062 17.585938 2.515625 C 18.046875 2.464844 18.515625 2.5 19.089844 2.5 C 17.199219 5.765625 15.339844 8.972656 13.421875 12.28125 C 13.199219 11.933594 13.007812 11.632812 12.769531 11.285156 Z M 12.769531 11.285156 "/> <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 12.03125 14.6875 C 11.414062 15.769531 10.800781 16.796875 10.1875 17.824219 C 10.113281 17.785156 10.054688 17.773438 10.027344 17.738281 C 9.179688 16.734375 9.25 15.800781 10.140625 14.824219 C 10.589844 14.332031 10.878906 13.695312 11.253906 13.105469 C 9.636719 10.230469 8.023438 7.339844 6.386719 4.464844 C 6.175781 4.097656 5.921875 3.660156 5.316406 4.03125 C 5.183594 4.109375 4.761719 3.90625 4.609375 3.71875 C 4.328125 3.382812 4.144531 2.960938 3.878906 2.5 C 4.859375 2.5 5.734375 2.472656 6.609375 2.519531 C 6.824219 2.53125 7.105469 2.734375 7.21875 2.929688 C 9.089844 6.136719 10.941406 9.355469 12.773438 12.582031 C 12.882812 12.777344 12.882812 13.113281 12.792969 13.320312 C 12.589844 13.777344 12.292969 14.195312 12.03125 14.6875 Z M 12.03125 14.6875 "/> <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 2.386719 4.496094 C 1.984375 3.828125 1.625 3.203125 1.230469 2.519531 C 1.941406 2.519531 2.554688 2.519531 3.1875 2.519531 C 5.289062 6.175781 7.394531 9.84375 9.503906 13.511719 C 9.761719 13.960938 9.40625 15.277344 8.953125 15.441406 C 8.859375 15.476562 8.640625 15.339844 8.574219 15.226562 C 7.375 13.171875 6.183594 11.109375 5 9.042969 C 4.136719 7.542969 3.285156 6.039062 2.386719 4.496094 Z M 2.386719 4.496094 "/> </g> </svg> <div class="jumpertext">Datavio</div> `
      

      const jumperModal = document.createElement('div')
      jumperModal.setAttribute('class', 'jumperdiv2');
      jumperModal.appendChild(await Jumper())

      let modalOpen = false;
      datavioJumper.onclick =  function (){
        if(modalOpen){
          modalOpen = false;
          jumperModal.setAttribute('class', 'jumperdiv2');
        }else{
          modalOpen=true;
          jumperModal.removeAttribute('class');
        }
      }
      allpagedesiredelement.appendChild(datavioJumper);
      allpagedesiredelement.appendChild(jumperModal);
      break;
    }
    }
  }
});

// Start observing mutations in the document body or any desired parent element
observer.observe(document.body, { childList: true, subtree: true });
observer2.observe(document.body, { childList: true, subtree: true });
chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  const currentUrl = window.location.href;
  if (currentUrl.includes('flipkart.com')) {
    console.log(request.type);
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
    } else if (request.type === 'keyword_modal'){
      console.log("YES")
      const alreadyExists = document.getElementById('keyword-modal');
      if (alreadyExists) {
        // remove the modal
        alreadyExists.remove();
      }

      const modal = document.createElement('div');
      modal.setAttribute('id', 'keyword-modal');
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
      header.innerText = 'Keyword Analyser';

      const closeModal = document.createElement('span');
      closeModal.setAttribute('id', 'closeModal');
      closeModal.setAttribute('class', 'close');
      closeModal.innerHTML = '&times;';
      closeModal.onclick = function () {
        const alreadyExists = document.getElementById('keyword-modal');
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

      const newDiv = await KeywordModal();
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
