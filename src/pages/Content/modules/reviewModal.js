import ReviewGenerator from './reviewsgenerator';
import { ratingDistGenerator } from './reviewsgenerator';
//import { urlGenerator } from './utils.js';
import { getAuthToken, constants } from '../../Popup/utils';
import WordCloud from './wordcloud2.js';

// function getProductTitle() {
//   const url = window.location.href;
//   // split the url by '/'
//   const urlSplit = url.split('/');
//   // get the product title
//   return urlSplit[3];
// }
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const readLocalStorage = async (key) => {
  let counter = 0;
  while((await chrome.storage.local.get(key))[key]=== "undefined" && counter < 60){
    await sleep(1000);
    counter++;
  }
  return chrome.storage.local.get(key);
};

async function filterData(selectedReviewFilters){
  chrome.storage.local.set({"allreview":"undefined"});
  await chrome.runtime.sendMessage({ message: 'filterData', data:selectedReviewFilters });
}


async function reviewNewModal() {
  const modal = document.createElement('div');
  modal.setAttribute('id', 'review-modal');

  let apiData = await readLocalStorage('overview')
  apiData = apiData.overview
  //console.log(apiData);
  let selectedReviewFilters = [];
  let allreviewdata = readLocalStorage('allreview');
  

  let wordlist = readLocalStorage('wordcloud')
  

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

  const bodyModalPlace = document.createElement('div');
  bodyModalPlace.setAttribute('class', 'kKjocj');

  const bodyModalPlace1 = document.createElement('div');
  bodyModalPlace1.setAttribute('class', 'gFZMBC');

  // body header
  const bodyHeader = document.createElement('div');
  bodyHeader.setAttribute('class', 'hlIGvb');

  const bodyHeaderHeading = document.createElement('h3');
  bodyHeaderHeading.setAttribute('class', 'dfAZhR');
  bodyHeaderHeading.innerText = `Total Reviews ${apiData.ratingsDistribution.reviewCount}`;

  bodyModalPlace1.appendChild(bodyHeader);

  bodyModalPlace.appendChild(bodyModalPlace1);

  body.appendChild(bodyModalPlace);
  header.appendChild(closeModal);
  modalClass2.appendChild(header);
  modalClass2.appendChild(body);
  bodyHeader.appendChild(bodyHeaderHeading);
  //body body
  const bodyBody = document.createElement('div');
  bodyBody.setAttribute('class', 'cTeFoo');
  bodyModalPlace1.appendChild(bodyBody);

  const productDetails = document.createElement('div');
  productDetails.setAttribute('class', 'jvntzP');

  const productName = document.createElement('div');
  productName.setAttribute('class', 'kbbAZG');
  productDetails.appendChild(productName);

  const productNameDetail = document.createElement('div');
  productNameDetail.setAttribute('class', 'dydjeI');
  productNameDetail.innerText = document.querySelector('.B_NuCI').textContent;

  productName.appendChild(productNameDetail);

  const contentDiv = document.createElement('div');
  contentDiv.setAttribute('class', 'dLsaGN');

  const contentTop = document.createElement('div');
  contentTop.setAttribute('class', 'didbWK');

  const menuBorder1 = document.createElement('div');
  menuBorder1.setAttribute('class', 'cRbJA A');
  const menuBorder2 = document.createElement('div');
  menuBorder2.setAttribute('class', 'cRbJA A');
  const menuBorder3 = document.createElement('div');
  menuBorder3.setAttribute('class', 'cRbJA A');
  const menuBorder4 = document.createElement('div');
  menuBorder4.setAttribute('class', 'cRbJA A');
  const menuBorder5 = document.createElement('div');
  menuBorder5.setAttribute('class', 'cRbJA A');

  const reviewsDiv1 = document.createElement('div');
  reviewsDiv1.setAttribute('class', 'bzssCu');

  const reviewsType1 = document.createElement('div');
  reviewsType1.setAttribute('tabindex', '0');
  reviewsType1.setAttribute('class', 'liSWKK');

  const reviewsTypeTitle1 = document.createElement('div');
  reviewsTypeTitle1.setAttribute('class', 'gsckYT');
  reviewsTypeTitle1.innerHTML = 'Overview';

  reviewsType1.appendChild(reviewsTypeTitle1);
  reviewsType1.appendChild(menuBorder1);
  reviewsDiv1.appendChild(reviewsType1);

  const reviewsDiv2 = document.createElement('div');
  reviewsDiv2.setAttribute('class', 'bzssCu');

  const reviewsType2 = document.createElement('div');
  reviewsType2.setAttribute('tabindex', '0');
  reviewsType2.setAttribute('id', 'chatgpt');
  reviewsType2.setAttribute('class', 'hiLyrj');

  const reviewsTypeTitle2 = document.createElement('div');
  reviewsTypeTitle2.setAttribute('class', 'gsckYT');
  reviewsTypeTitle2.innerHTML = 'ChatGPT Analysis';

  reviewsType2.appendChild(reviewsTypeTitle2);
  reviewsType2.appendChild(menuBorder2);
  reviewsDiv2.appendChild(reviewsType2);

  const reviewsDiv3 = document.createElement('div');
  reviewsDiv3.setAttribute('class', 'bzssCu');

  const reviewsType3 = document.createElement('div');

  reviewsType3.setAttribute('tabindex', '0');
  reviewsType3.setAttribute('class', 'hiLyrj');

  const reviewsTypeTitle3 = document.createElement('div');
  reviewsTypeTitle3.setAttribute('class', 'gsckYT');
  reviewsTypeTitle3.innerHTML = 'Review Analysis';

  const reviewsDiv4 = document.createElement('div');
  reviewsDiv4.setAttribute('class', 'bzssCu');

  const reviewsType4 = document.createElement('div');
  reviewsType4.setAttribute('id', 'review-analysis');
  reviewsType4.setAttribute('tabindex', '0');
  reviewsType4.setAttribute('class', 'hiLyrj');

  const reviewsTypeTitle4 = document.createElement('div');
  reviewsTypeTitle4.setAttribute('class', 'gsckYT');
  reviewsTypeTitle4.innerHTML = 'All Reviews';

  //wordcloud
  const wordCloudDiv = document.createElement('div');
  wordCloudDiv.setAttribute('id', 'wordcloud');
  wordCloudDiv.setAttribute('class', 'wordcloudclass');
  wordCloudDiv.setAttribute('style', 'width: 90%; height: 80%; margin-left : 4%; padding-right:20px; overflow-y: auto; max-height:85%;');

  reviewsType3.appendChild(reviewsTypeTitle3);
  reviewsType3.appendChild(menuBorder3);
  reviewsDiv3.appendChild(reviewsType3);
  reviewsType4.appendChild(reviewsTypeTitle4);
  reviewsType4.appendChild(menuBorder4);
  reviewsDiv4.appendChild(reviewsType4);
  contentDiv.appendChild(contentTop);
  contentTop.appendChild(reviewsDiv1);
  contentTop.appendChild(reviewsDiv2);
  contentTop.appendChild(reviewsDiv3);
  contentTop.appendChild(reviewsDiv4);
  bodyBody.appendChild(contentDiv);
  bodyBody.appendChild(productDetails);
  bodyBody.appendChild(wordCloudDiv);

  //Filters

  const form = document.createElement('form');
  form.setAttribute('class', 'cnikoG2');

  bodyBody.appendChild(form);

  const filtersDiv = document.createElement('div');
  filtersDiv.setAttribute('class', 'IGmAC');

  form.appendChild(filtersDiv);

  const allFilter = document.createElement('div');
  allFilter.setAttribute('class', 'iaZWuG');

  filtersDiv.appendChild(allFilter);

  const selectRating = document.createElement('div');
  selectRating.setAttribute('class', 'lerQSN');

  allFilter.appendChild(selectRating);

  const dropdown = document.createElement('div');
  dropdown.setAttribute('class', 'hNeyOA');
  dropdown.setAttribute('data-open', 'false');

  selectRating.appendChild(dropdown);

  const allDropdown = document.createElement('div');
  allDropdown.setAttribute('class', 'sc-dmaBdM jMlZvI');

  dropdown.appendChild(allDropdown);

  const dropdownIcon = document.createElement('span');
  dropdownIcon.setAttribute('class', 'sc-fWSMSg cgJLBi');
  dropdownIcon.innerHTML =
    '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="angle-down" class="svg-inline--fa fa-angle-down " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M360.5 217.5l-152 143.1C203.9 365.8 197.9 368 192 368s-11.88-2.188-16.5-6.562L23.5 217.5C13.87 208.3 13.47 193.1 22.56 183.5C31.69 173.8 46.94 173.5 56.5 182.6L192 310.9l135.5-128.4c9.562-9.094 24.75-8.75 33.94 .9375C370.5 193.1 370.1 208.3 360.5 217.5z"></path></svg>';
  dropdown.appendChild(dropdownIcon);

  const dropdownMenu = document.createElement('div');
  dropdownMenu.setAttribute('class', 'abcdef');
  //dropdownMenu.innerHTML ='<div data-placement="bottom-start" data-testid="undefined-dropdown"><div class="sc-eixvJN bdtKyo"><div class="sc-fOuYhK gTyetu"><div data-grouped="false" class="sc-fZKIUC fOYJlQ"><div role="option" data-value="5" class="sc-gIwoD HBZlb"><span class="sc-chCsht elxNIY"></span><span class="sc-cUOIGw kkzglY">5 stars only</span></div><div role="option" data-value="4" class="sc-gIwoD HBZlb"><span class="sc-chCsht elxNIY"></span><span class="sc-cUOIGw kkzglY">4 stars only</span></div><div role="option" data-value="3" class="sc-gIwoD HBZlb"><span class="sc-chCsht elxNIY"></span><span class="sc-cUOIGw kkzglY">3 stars only</span></div><div role="option" data-value="2" class="sc-gIwoD HBZlb"><span class="sc-chCsht elxNIY"></span><span class="sc-cUOIGw kkzglY">2 stars only</span></div><div role="option" data-value="1" class="sc-gIwoD HBZlb"><span class="sc-chCsht elxNIY"></span><span class="sc-cUOIGw kkzglY">1 star only</span></div></div></div></div></div>';

  const dropdownDiv1 = document.createElement('div');
  dropdownDiv1.setAttribute('class', 'bdtKyo');
  const dropdownDiv2 = document.createElement('div');
  dropdownDiv2.setAttribute('class', 'gTyetu');
  const dropdownDiv3 = document.createElement('div');
  dropdownDiv3.setAttribute('class', 'fOYJlQ');

  dropdownMenu.appendChild(dropdownDiv1);
  dropdownDiv1.appendChild(dropdownDiv2);
  dropdownDiv2.appendChild(dropdownDiv3);

  const dropdown5Star = document.createElement('div');
  dropdown5Star.setAttribute('class', 'HBZlb');

  dropdownDiv3.appendChild(dropdown5Star);

  const dropdown4Star = document.createElement('div');
  dropdown4Star.setAttribute('class', 'HBZlb');

  dropdownDiv3.appendChild(dropdown4Star);

  const dropdown3Star = document.createElement('div');
  dropdown3Star.setAttribute('class', 'HBZlb');

  dropdownDiv3.appendChild(dropdown3Star);

  const dropdown2Star = document.createElement('div');
  dropdown2Star.setAttribute('class', 'HBZlb');

  dropdownDiv3.appendChild(dropdown2Star);

  const dropdown1Star = document.createElement('div');
  dropdown1Star.setAttribute('class', 'HBZlb');

  dropdownDiv3.appendChild(dropdown1Star);

  const checkbox5star = document.createElement('span');
  checkbox5star.setAttribute('class', 'elxNIY');

  dropdown5Star.appendChild(checkbox5star);

  const checkbox4star = document.createElement('span');
  checkbox4star.setAttribute('class', 'elxNIY');

  dropdown4Star.appendChild(checkbox4star);

  const checkbox3star = document.createElement('span');
  checkbox3star.setAttribute('class', 'elxNIY');

  dropdown3Star.appendChild(checkbox3star);

  const checkbox2star = document.createElement('span');
  checkbox2star.setAttribute('class', 'elxNIY');

  dropdown2Star.appendChild(checkbox2star);

  const checkbox1star = document.createElement('span');
  checkbox1star.setAttribute('class', 'elxNIY');

  dropdown1Star.appendChild(checkbox1star);

  const title5star = document.createElement('span');
  title5star.setAttribute('class', 'kkzglY');
  title5star.innerHTML = '5 Star Only';

  dropdown5Star.appendChild(title5star);

  const title4star = document.createElement('span');
  title4star.setAttribute('class', 'kkzglY');
  title4star.innerHTML = '4 Star Only';

  dropdown4Star.appendChild(title4star);

  const title3star = document.createElement('span');
  title3star.setAttribute('class', 'kkzglY');
  title3star.innerHTML = '3 Star Only';

  dropdown3Star.appendChild(title3star);

  const title2star = document.createElement('span');
  title2star.setAttribute('class', 'kkzglY');
  title2star.innerHTML = '2 Star Only';

  dropdown2Star.appendChild(title2star);

  const title1star = document.createElement('span');
  title1star.setAttribute('class', 'kkzglY');
  title1star.innerHTML = '1 Star Only';

  dropdown1Star.appendChild(title1star);

  let selectedStar = [];

  let selectedStarSet = new Set();

  let numberOfRating;

  async function setTitle() {
    selectedStar = Array.from(selectedStarSet);
    if (selectedStar.length === 0) {
      numberOfRating = 'Select Ratings';
    } else if (selectedStar.length === 1) {
      numberOfRating = '1 Selected';
    } else if (selectedStar.length === 2) {
      numberOfRating = '2 Selected';
    } else if (selectedStar.length === 3) {
      numberOfRating = '3 Selected';
    } else if (selectedStar.length === 4) {
      numberOfRating = '4 Selected';
    } else {
      numberOfRating = '5 Selected';
    }
  }

  const dropdownBtn = document.createElement('span');
  dropdownBtn.setAttribute('class', 'hlNbkn');
  dropdownBtn.setAttribute('data-open', 'false');
  dropdownBtn.innerHTML = `Select Ratings`;

  //DROPDOWN MENU ONCLICK CHANGES
  let bool5star = false;
  dropdown5Star.onclick = async function () {
    bool5star = !bool5star;
    if (bool5star === true) {
      dropdown5Star.removeAttribute('class');
      checkbox5star.removeAttribute('class');
      checkbox5star.setAttribute('class', 'kJQLCS');
      dropdown5Star.setAttribute('class', 'tAYZw');
      checkbox5star.innerHTML =
        '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="check" class="svg-inline--fa fa-check sc-iExEVL dMAoiw" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M440.1 103C450.3 112.4 450.3 127.6 440.1 136.1L176.1 400.1C167.6 410.3 152.4 410.3 143 400.1L7.029 264.1C-2.343 255.6-2.343 240.4 7.029 231C16.4 221.7 31.6 221.7 40.97 231L160 350.1L407 103C416.4 93.66 431.6 93.66 440.1 103V103z"></path></svg>';
      selectedStarSet.add(5);
      await setTitle();
      dropdownBtn.innerHTML = `${numberOfRating}`;
    } else {
      dropdown5Star.removeAttribute('class');
      checkbox5star.removeAttribute('class');
      checkbox5star.setAttribute('class', 'elxNIY');
      dropdown5Star.setAttribute('class', 'HBZlb');
      checkbox5star.innerHTML = '';
      selectedStarSet.delete(5);
      await setTitle();
      dropdownBtn.innerHTML = `${numberOfRating}`;
    }
  };

  let bool4star = false;
  dropdown4Star.onclick = async function () {
    bool4star = !bool4star;
    if (bool4star === true) {
      dropdown4Star.removeAttribute('class');
      checkbox4star.removeAttribute('class');
      checkbox4star.setAttribute('class', 'kJQLCS');
      dropdown4Star.setAttribute('class', 'tAYZw');
      checkbox4star.innerHTML =
        '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="check" class="svg-inline--fa fa-check sc-iExEVL dMAoiw" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M440.1 103C450.3 112.4 450.3 127.6 440.1 136.1L176.1 400.1C167.6 410.3 152.4 410.3 143 400.1L7.029 264.1C-2.343 255.6-2.343 240.4 7.029 231C16.4 221.7 31.6 221.7 40.97 231L160 350.1L407 103C416.4 93.66 431.6 93.66 440.1 103V103z"></path></svg>';
      selectedStarSet.add(4);
      await setTitle();
      dropdownBtn.innerHTML = `${numberOfRating}`;
    } else {
      dropdown4Star.removeAttribute('class');
      checkbox4star.removeAttribute('class');
      checkbox4star.setAttribute('class', 'elxNIY');
      dropdown4Star.setAttribute('class', 'HBZlb');
      checkbox4star.innerHTML = '';
      selectedStarSet.delete(4);
      await setTitle();
      dropdownBtn.innerHTML = `${numberOfRating}`;
    }
  };
  let bool3star = false;
  dropdown3Star.onclick = async function () {
    bool3star = !bool3star;
    if (bool3star === true) {
      dropdown3Star.removeAttribute('class');
      checkbox3star.removeAttribute('class');
      checkbox3star.setAttribute('class', 'kJQLCS');
      dropdown3Star.setAttribute('class', 'tAYZw');
      checkbox3star.innerHTML =
        '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="check" class="svg-inline--fa fa-check sc-iExEVL dMAoiw" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M440.1 103C450.3 112.4 450.3 127.6 440.1 136.1L176.1 400.1C167.6 410.3 152.4 410.3 143 400.1L7.029 264.1C-2.343 255.6-2.343 240.4 7.029 231C16.4 221.7 31.6 221.7 40.97 231L160 350.1L407 103C416.4 93.66 431.6 93.66 440.1 103V103z"></path></svg>';
      selectedStarSet.add(3);
      await setTitle();
      dropdownBtn.innerHTML = `${numberOfRating}`;
    } else {
      dropdown3Star.removeAttribute('class');
      checkbox3star.removeAttribute('class');
      checkbox3star.setAttribute('class', 'elxNIY');
      dropdown3Star.setAttribute('class', 'HBZlb');
      checkbox3star.innerHTML = '';
      selectedStarSet.delete(3);
      await setTitle();
      dropdownBtn.innerHTML = `${numberOfRating}`;
    }
  };
  let bool2star = false;
  dropdown2Star.onclick = async function () {
    bool2star = !bool2star;
    if (bool2star === true) {
      dropdown2Star.removeAttribute('class');
      checkbox2star.removeAttribute('class');
      checkbox2star.setAttribute('class', 'kJQLCS');
      dropdown2Star.setAttribute('class', 'tAYZw');
      checkbox2star.innerHTML =
        '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="check" class="svg-inline--fa fa-check sc-iExEVL dMAoiw" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M440.1 103C450.3 112.4 450.3 127.6 440.1 136.1L176.1 400.1C167.6 410.3 152.4 410.3 143 400.1L7.029 264.1C-2.343 255.6-2.343 240.4 7.029 231C16.4 221.7 31.6 221.7 40.97 231L160 350.1L407 103C416.4 93.66 431.6 93.66 440.1 103V103z"></path></svg>';
      selectedStarSet.add(2);
      await setTitle();
      dropdownBtn.innerHTML = `${numberOfRating}`;
    } else {
      dropdown2Star.removeAttribute('class');
      checkbox2star.removeAttribute('class');
      checkbox2star.setAttribute('class', 'elxNIY');
      dropdown2Star.setAttribute('class', 'HBZlb');
      checkbox2star.innerHTML = '';
      selectedStarSet.delete(2);
      await setTitle();
      dropdownBtn.innerHTML = `${numberOfRating}`;
    }
  };
  let bool1star = false;
  dropdown1Star.onclick = async function () {
    bool1star = !bool1star;
    if (bool1star === true) {
      dropdown1Star.removeAttribute('class');
      checkbox1star.removeAttribute('class');
      checkbox1star.setAttribute('class', 'kJQLCS');
      dropdown1Star.setAttribute('class', 'tAYZw');
      checkbox1star.innerHTML =
        '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="check" class="svg-inline--fa fa-check sc-iExEVL dMAoiw" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M440.1 103C450.3 112.4 450.3 127.6 440.1 136.1L176.1 400.1C167.6 410.3 152.4 410.3 143 400.1L7.029 264.1C-2.343 255.6-2.343 240.4 7.029 231C16.4 221.7 31.6 221.7 40.97 231L160 350.1L407 103C416.4 93.66 431.6 93.66 440.1 103V103z"></path></svg>';
      selectedStarSet.add(1);
      await setTitle();
      dropdownBtn.innerHTML = `${numberOfRating}`;
    } else {
      dropdown1Star.removeAttribute('class');
      checkbox1star.removeAttribute('class');
      checkbox1star.setAttribute('class', 'elxNIY');
      dropdown1Star.setAttribute('class', 'HBZlb');
      checkbox1star.innerHTML = '';
      selectedStarSet.delete(1);
      await setTitle();
      dropdownBtn.innerHTML = `${numberOfRating}`;
    }
  };

  allDropdown.appendChild(dropdownBtn);

  let bool = false;
  dropdown.onclick = async function () {
    bool = !bool;
    if (bool === true) {
      dropdown.removeAttribute('class');
      dropdown.setAttribute('class', 'dsigvn');
      selectRating.appendChild(dropdownMenu);
      dropdownBtn.removeAttribute('data-open');
      dropdownBtn.setAttribute('data-open', 'true');
    } else {
      dropdown.removeAttribute('class');
      dropdown.setAttribute('class', 'hNeyOA');
      selectRating.removeChild(dropdownMenu);
      dropdownBtn.removeAttribute('data-open');
      dropdownBtn.setAttribute('data-open', 'false');
    }
  };

  const selectVerified = document.createElement('div');
  selectVerified.setAttribute('class', 'lerQSN');

  allFilter.appendChild(selectVerified);

  const verified = document.createElement('div');
  verified.setAttribute('class', 'hNeyOA');

  selectVerified.appendChild(verified);

  const checkVerified = document.createElement('div');
  checkVerified.setAttribute('class', 'HBZlb');

  verified.appendChild(checkVerified);

  const checkbox = document.createElement('span');
  checkbox.setAttribute('class', 'elxNIY');

  checkVerified.appendChild(checkbox);

  const checkboxName = document.createElement('span');
  checkboxName.setAttribute('class', 'kkzglY');
  checkboxName.innerHTML = 'Verified';

  checkVerified.appendChild(checkboxName);

  let verifiedBool = false;
  verified.onclick = async function () {
    verifiedBool = !verifiedBool;
    if (verifiedBool === true) {
      checkVerified.removeAttribute('class');
      checkVerified.setAttribute('class', 'tAYZw');
      checkbox.removeAttribute('class');
      checkbox.setAttribute('class', 'kJQLCS');
      checkbox.innerHTML =
        '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="check" class="svg-inline--fa fa-check sc-iExEVL dMAoiw" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M440.1 103C450.3 112.4 450.3 127.6 440.1 136.1L176.1 400.1C167.6 410.3 152.4 410.3 143 400.1L7.029 264.1C-2.343 255.6-2.343 240.4 7.029 231C16.4 221.7 31.6 221.7 40.97 231L160 350.1L407 103C416.4 93.66 431.6 93.66 440.1 103V103z"></path></svg>';
    } else {
      checkVerified.removeAttribute('class');
      checkVerified.setAttribute('class', 'HBZlb');
      checkbox.removeAttribute('class');
      checkbox.setAttribute('class', 'elxNIY');
      checkbox.innerHTML = '';
    }
  };

  const enterKeyword = document.createElement('div');
  enterKeyword.setAttribute('class', 'lerQSN');

  allFilter.appendChild(enterKeyword);

  const keywordDiv = document.createElement('div');
  keywordDiv.setAttribute('class', 'hNeyOA');

  enterKeyword.appendChild(keywordDiv);

  const keyword = document.createElement('input');
  keyword.setAttribute('class', 'kkDNaA');
  keyword.setAttribute('placeholder', 'Enter a Keyword');
  keyword.setAttribute('id', 'myInput');
  keywordDiv.appendChild(keyword);

  let keywordValue = '';
  keywordDiv.querySelector('input').addEventListener('input', async (event) => {
    keywordValue = `${event.target.value}`;
  });

  const clearBtn = document.createElement('div');
  clearBtn.setAttribute('class', 'sc-dWddBi jSmkTg');
  clearBtn.innerHTML = 'Clear';

  const applyBtn = document.createElement('button');
  applyBtn.setAttribute('class', 'sc-dWddBi NZXZk');
  applyBtn.innerHTML = 'Apply Filters';

  allFilter.appendChild(clearBtn);
  allFilter.appendChild(applyBtn);

  const showMoreBtn = document.createElement('button');
  showMoreBtn.setAttribute('class', 'sc-dWddBi NZXZk');
  showMoreBtn.innerHTML = 'Load More Reviews';

  let currrentReviewCount = 0;

  const loading = document.createElement('div');
  loading.setAttribute('class', 'sk-chase');
  loading.innerHTML =
    '<div class="sk-chase-dot"></div><div class="sk-chase-dot"></div><div class="sk-chase-dot"></div><div class="sk-chase-dot"></div><div class="sk-chase-dot"></div><div class="sk-chase-dot"></div>';

  clearBtn.onclick = async function (e) {
    e.preventDefault();
    selectedReviewFilters = [];
    verifiedBool = false;
    selectedStarSet.clear();
    selectedStar = [];
    keywordValue = '';
    bool1star = false;
    bool2star = false;
    bool3star = false;
    bool4star = false;
    bool5star = false;
    checkbox.removeAttribute('class');
    checkbox.setAttribute('class', 'elxNIY');
    document.getElementById('myInput').value = '';
    checkbox1star.removeAttribute('class');
    checkbox1star.setAttribute('class', 'elxNIY');
    checkbox2star.removeAttribute('class');
    checkbox2star.setAttribute('class', 'elxNIY');
    checkbox3star.removeAttribute('class');
    checkbox3star.setAttribute('class', 'elxNIY');
    checkbox4star.removeAttribute('class');
    checkbox4star.setAttribute('class', 'elxNIY');
    checkbox5star.removeAttribute('class');
    checkbox5star.setAttribute('class', 'elxNIY');
    dropdown1Star.removeAttribute('class');
    dropdown1Star.setAttribute('class', 'HBZlb');
    dropdown2Star.removeAttribute('class');
    dropdown2Star.setAttribute('class', 'HBZlb');
    dropdown3Star.removeAttribute('class');
    dropdown3Star.setAttribute('class', 'HBZlb');
    dropdown4Star.removeAttribute('class');
    dropdown4Star.setAttribute('class', 'HBZlb');
    dropdown5Star.removeAttribute('class');
    dropdown5Star.setAttribute('class', 'HBZlb');
    await setTitle();
    dropdownBtn.innerHTML = `${numberOfRating}`;
    reviewDiv.innerHTML = '';
    reviewDiv.appendChild(loading);
    await filterData(selectedReviewFilters);
    allreviewdata = await readLocalStorage('allreview');
    reviewDiv.removeChild(loading);
    allreviewdata = allreviewdata.allreview;
    currrentReviewCount = 0;
    //console.log(allreviewdata);
    
    for (let i = 0; i < Math.min(allreviewdata.length, 100); i++) {
      let newReview = ReviewGenerator(i, allreviewdata[i]);
      reviewDiv.appendChild(newReview);
      if (i === 99 && allreviewdata.length > 100) {
        reviewDiv.appendChild(showMoreBtn);
      }
    }
  };

  applyBtn.onclick = async function (e) {
    e.preventDefault();
    selectedReviewFilters = [];
    let arrayObj = {
      metric: 'rating',
      values: selectedStar,
    };
    let verifiedObj = {
      metric: 'verfied',
      values: `${verifiedBool}`,
    };
    let keywordObj = {
      metric: 'name',
      values: keywordValue,
    };
    if (selectedStar.length > 0) {
      selectedReviewFilters.push(arrayObj);
    }
    if (verifiedBool === true) {
      selectedReviewFilters.push(verifiedObj);
    }
    if (keywordValue !== '') {
      selectedReviewFilters.push(keywordObj);
    }
    //console.log(verifiedBool);
    //console.log(keywordValue);
    //console.log(selectedStar);
    reviewDiv.innerHTML = '';
    reviewDiv.appendChild(loading);
    await filterData(selectedReviewFilters);
    allreviewdata = await readLocalStorage('allreview');
    reviewDiv.removeChild(loading);
    allreviewdata = allreviewdata.allreview;
    currrentReviewCount = 0;
    //console.log(allreviewdata);

    for (let i = 0; i < Math.min(allreviewdata.length, 100); i++) {
      let newReview = ReviewGenerator(i, allreviewdata[i]);
      reviewDiv.appendChild(newReview);
      if (i === 99 && allreviewdata.length > 100) {
        reviewDiv.appendChild(showMoreBtn);
      }
    }
  };

  showMoreBtn.onclick = async function (e) {
    e.preventDefault();
    reviewDiv.removeChild(showMoreBtn);
    currrentReviewCount += Math.min(
      100,
      allreviewdata.length - currrentReviewCount
    );
    for (
      let i = currrentReviewCount;
      i < Math.min(allreviewdata.length, currrentReviewCount + 100);
      i++
    ) {
      let newReview = ReviewGenerator(i, allreviewdata[i]);
      reviewDiv.appendChild(newReview);
      if (
        i === currrentReviewCount + 99 &&
        allreviewdata.length > currrentReviewCount + 100
      ) {
        reviewDiv.appendChild(showMoreBtn);
      }
    }
  };

  //Overview

  const overviewDiv = document.createElement('div');
  overviewDiv.setAttribute('class', 'gnaJEW');

  const overviewSplitDiv = document.createElement('div');
  overviewSplitDiv.setAttribute('class', 'gxxFEr');

  const overviewLeftDiv = document.createElement('div');
  overviewLeftDiv.setAttribute('class', 'jBOLsP');

  const overviewTableDiv = document.createElement('div');
  overviewTableDiv.setAttribute('class', 'hhdZCl');

  const tableWrapper = document.createElement('div');
  tableWrapper.setAttribute('class', 'jWPjfx');

  const tableWrapper2 = document.createElement('div');
  tableWrapper2.setAttribute('class', 'cfrHHF');
  tableWrapper2.innerHTML = '';

  const tableGrids = document.createElement('div');
  tableGrids.setAttribute('class', 'jJAKYt');

  const precolumn = document.createElement('div');
  precolumn.setAttribute('class', 'sc-fIUAFO kHEhFe hluwYK dOCNWn');
  precolumn.setAttribute('style', 'width: 0px;');

  const precolumnchild = document.createElement('div');
  precolumnchild.setAttribute('class', 'sc-lmyUgd cPxMvK');

  const precolumnchildchild = document.createElement('div');
  precolumnchildchild.setAttribute('class', 'dXTXNN');

  precolumnchild.appendChild(precolumnchildchild);
  precolumn.appendChild(precolumnchild);

  const column1 = document.createElement('div');
  column1.setAttribute('style', 'display: contents;');
  const column2 = document.createElement('div');
  column2.setAttribute('style', 'display: contents;');
  const column3 = document.createElement('div');
  column3.setAttribute('style', 'display: contents;');
  const column4 = document.createElement('div');
  column4.setAttribute('style', 'display: contents;');

  const postColumn = document.createElement('div');
  postColumn.setAttribute('class', 'sc-fIUAFO kHEhFe fgAHMr gLxfFe');
  postColumn.setAttribute('style', 'width: 0px;');

  const postColumnChild = document.createElement('div');
  postColumnChild.setAttribute('class', 'sc-hIPkLu fKFNkZ');

  postColumn.appendChild(postColumnChild);
  //Rating
  const rating = document.createElement('div');
  rating.setAttribute('class', 'dZrlxP HHhCc bbPTwY');

  const ratingName = document.createElement('div');
  ratingName.setAttribute('class', 'bimpkv');
  ratingName.innerHTML = 'Rating';

  //Rating count
  const ratingCount = document.createElement('div');
  ratingCount.setAttribute('class', 'fRhIzs HHhCc bbPTwY');

  const ratingCountDiv = document.createElement('div');
  ratingCountDiv.setAttribute('class', 'eUFYmb');

  const ratingCountName = document.createElement('div');
  ratingCountName.setAttribute('class', 'uXEUb');
  ratingCountName.innerHTML = 'Rating Count';

  //Distribution

  const distribution = document.createElement('div');
  distribution.setAttribute('class', 'fRhIzs HHhCc bbPTwY');

  const distributionName = document.createElement('div');
  distributionName.setAttribute('class', 'eUFymb');
  distributionName.innerHTML = 'Distribution';

  //See All

  const seeAll = document.createElement('div');
  seeAll.setAttribute('class', 'fRhIzs HHhCc bbPTwY');

  const seeAllDiv = document.createElement('div');
  seeAllDiv.setAttribute('class', 'GtsQR');

  rating.appendChild(ratingName);
  column1.appendChild(rating);
  distribution.appendChild(distributionName);
  column3.appendChild(distribution);
  ratingCountDiv.appendChild(ratingCountName);
  ratingCount.appendChild(ratingCountDiv);
  column2.appendChild(ratingCount);
  seeAll.appendChild(seeAllDiv);
  column4.appendChild(seeAll);

  tableGrids.appendChild(precolumn);
  tableGrids.appendChild(column1);
  tableGrids.appendChild(column2);
  tableGrids.appendChild(column3);
  tableGrids.appendChild(column4);
  tableGrids.appendChild(postColumn);

  // append rating wise rows
  for (let i = 4; i >= 0; i--) {
    const ratingsDistributionDiv = ratingDistGenerator(
      i,
      apiData.ratingsDistribution.breakup[i],
      apiData.ratingsDistribution.count
    );
    tableGrids.appendChild(ratingsDistributionDiv);
  }

  tableWrapper2.appendChild(tableGrids);
  tableWrapper.appendChild(tableWrapper2);
  overviewTableDiv.appendChild(tableWrapper);
  overviewLeftDiv.appendChild(overviewTableDiv);
  overviewSplitDiv.appendChild(overviewLeftDiv);
  overviewDiv.appendChild(overviewSplitDiv);
  bodyBody.appendChild(overviewDiv);


  const overviewRightDiv = document.createElement('div');
  overviewRightDiv.setAttribute('class', 'epbpWv');

  overviewSplitDiv.appendChild(overviewRightDiv);

  const overviewTopTitle = document.createElement('div');
  overviewTopTitle.setAttribute('class', 'bgGCiT');
  overviewTopTitle.innerHTML = 'Top Helpful Review';

  let overviewReviewDiv = document.createElement('div');
  overviewReviewDiv.setAttribute('class', 'gtKjyK');

  overviewRightDiv.appendChild(overviewTopTitle);
  overviewRightDiv.appendChild(overviewReviewDiv);

  //Reviews

  for (let i = 0; i < apiData.mostHelpFulReviews.length; i++) {
    let newReview = ReviewGenerator(i, apiData.mostHelpFulReviews[i]);
    overviewReviewDiv.appendChild(newReview);
  }

  // All Reviews
  const allReviewDiv = document.createElement('div');
  allReviewDiv.setAttribute('class', 'epbpWv2');

  bodyBody.appendChild(allReviewDiv);

  const reviewTitle = document.createElement('div');
  reviewTitle.setAttribute('class', 'bgGCiT');
  reviewTitle.innerHTML = 'All Reviews';

  const reviewDiv = document.createElement('div');
  reviewDiv.setAttribute('class', 'gtKjyK');

  allReviewDiv.appendChild(reviewTitle);
  allReviewDiv.appendChild(reviewDiv);

  allReviewDiv.appendChild(reviewDiv);

//AI Analysis
const aiAnalysis = document.createElement('div');
aiAnalysis.setAttribute('class', 'aiAnalysis2');

bodyBody.appendChild(aiAnalysis);

const aiSection1 = document.createElement('div');
aiSection1.setAttribute('class', 'section1')

const aiSection2 = document.createElement('div');
aiSection2.setAttribute('class', 'section2')
aiSection2.innerHTML='<svg class = "locksvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100px" height="100px" viewBox="0 0 100 100" version="1.1"><g id="surface1"><path style=" stroke:none;fill-rule:nonzero;fill:rgb(94.509804%,76.862745%,5.882353%);fill-opacity:1;" d="M 20.832031 37.5 C 16.230469 37.5 12.5 41.25 12.5 45.832031 L 12.5 79.167969 C 12.5 83.75 16.230469 87.5 20.832031 87.5 L 79.167969 87.5 C 83.769531 87.5 87.5 83.75 87.5 79.167969 L 87.5 45.832031 C 87.5 41.25 83.769531 37.5 79.167969 37.5 Z M 20.832031 37.5 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(95.294118%,61.176471%,7.058824%);fill-opacity:1;" d="M 20.832031 50 C 16.230469 50 12.5 53.75 12.5 58.332031 L 12.5 91.667969 C 12.5 96.25 16.230469 100 20.832031 100 L 79.167969 100 C 83.769531 100 87.5 96.25 87.5 91.667969 L 87.5 58.332031 C 87.5 53.75 83.769531 50 79.167969 50 Z M 20.832031 50 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(74.117647%,76.470588%,78.039216%);fill-opacity:1;" d="M 50 4.167969 C 33.890625 4.167969 20.832031 17.082031 20.832031 33.332031 L 33.332031 33.332031 C 33.332031 24.167969 40.796875 16.667969 50 16.667969 C 59.203125 16.667969 66.667969 24.167969 66.667969 33.332031 L 79.167969 33.332031 C 79.167969 17.082031 66.109375 4.167969 50 4.167969 Z M 50 4.167969 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(90.196078%,49.411765%,13.333333%);fill-opacity:1;" d="M 20.832031 58.332031 L 20.832031 62.5 L 79.167969 62.5 L 79.167969 58.332031 Z M 20.832031 66.667969 L 20.832031 70.832031 L 79.167969 70.832031 L 79.167969 66.667969 Z M 20.832031 75 L 20.832031 79.167969 L 79.167969 79.167969 L 79.167969 75 Z M 20.832031 83.332031 L 20.832031 87.5 L 79.167969 87.5 L 79.167969 83.332031 Z M 20.832031 83.332031 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(49.803922%,54.901961%,55.294118%);fill-opacity:1;" d="M 20.832031 37.5 L 20.832031 41.667969 C 20.832031 43.75 23.632812 45.832031 27.082031 45.832031 C 30.535156 45.832031 33.332031 43.75 33.332031 41.667969 L 33.332031 37.5 C 33.332031 39.582031 30.535156 41.667969 27.082031 41.667969 C 23.632812 41.667969 20.832031 39.582031 20.832031 37.5 Z M 20.832031 37.5 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(49.803922%,54.901961%,55.294118%);fill-opacity:1;" d="M 66.667969 37.5 L 66.667969 41.667969 C 66.667969 43.75 69.464844 45.832031 72.917969 45.832031 C 76.367188 45.832031 79.167969 43.75 79.167969 41.667969 L 79.167969 37.5 C 79.167969 39.582031 76.367188 41.667969 72.917969 41.667969 C 69.464844 41.667969 66.667969 39.582031 66.667969 37.5 Z M 66.667969 37.5 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(58.431373%,64.705882%,65.098039%);fill-opacity:1;" d="M 50 10.15625 C 48.539062 10.15625 47.085938 10.296875 45.703125 10.546875 C 44.675781 10.734375 43.675781 11.015625 42.707031 11.328125 C 41.804688 11.621094 40.945312 11.980469 40.105469 12.371094 C 39.664062 12.574219 39.226562 12.789062 38.800781 13.019531 C 38.253906 13.320312 37.753906 13.722656 37.238281 14.0625 C 36.757812 14.382812 36.257812 14.621094 35.808594 14.972656 C 35.222656 15.429688 34.640625 15.894531 34.113281 16.40625 C 33.960938 16.558594 33.871094 16.773438 33.722656 16.925781 C 33.023438 17.652344 32.34375 18.324219 31.769531 19.140625 C 31.1875 19.972656 30.644531 20.835938 30.207031 21.746094 C 30.191406 21.78125 30.226562 21.839844 30.207031 21.875 C 29.746094 22.859375 29.308594 23.941406 29.035156 25 C 27.984375 27.433594 25.109375 29.167969 21.746094 29.167969 C 21.496094 29.167969 21.398438 29.175781 21.222656 29.167969 C 21.179688 29.164062 21.152344 29.171875 21.09375 29.167969 L 20.832031 33.332031 L 20.832031 41.667969 L 33.332031 41.667969 L 33.332031 33.332031 C 33.332031 32.183594 33.503906 31.03125 33.722656 29.949219 C 35.277344 22.351562 41.945312 16.667969 50 16.667969 C 59.203125 16.667969 66.667969 24.128906 66.667969 33.332031 L 66.667969 41.667969 L 79.167969 41.667969 L 79.167969 33.332031 L 78.910156 29.167969 C 78.847656 29.171875 78.820312 29.164062 78.773438 29.167969 L 78.253906 29.167969 C 74.890625 29.167969 72.015625 27.433594 70.960938 25 C 70.691406 23.941406 70.253906 22.859375 69.792969 21.875 C 69.773438 21.839844 69.808594 21.78125 69.792969 21.746094 C 69.355469 20.835938 68.8125 19.972656 68.230469 19.140625 C 67.652344 18.324219 66.980469 17.652344 66.273438 16.925781 C 66.125 16.769531 66.046875 16.558594 65.882812 16.40625 C 65.359375 15.894531 64.777344 15.429688 64.191406 14.972656 C 63.757812 14.632812 63.226562 14.371094 62.757812 14.0625 C 62.25 13.726562 61.742188 13.316406 61.199219 13.019531 C 60.777344 12.792969 60.332031 12.574219 59.894531 12.371094 C 59.054688 11.980469 58.195312 11.621094 57.292969 11.328125 C 56.324219 11.015625 55.324219 10.734375 54.296875 10.546875 C 52.914062 10.296875 51.460938 10.15625 50 10.15625 Z M 50 10.15625 "/></g></svg>'


aiAnalysis.appendChild(aiSection1)
aiAnalysis.appendChild(aiSection2)

const section1Title = document.createElement('h3')
section1Title.setAttribute('class', 'sectitle article-blurb-title blurb-title-features');
section1Title.innerHTML='Most frequent complaints about the product include:'



aiSection1.appendChild(section1Title);


const analysis1Div = document.createElement('ul');
analysis1Div.setAttribute('class', 'article-blurb article-blurb-disadvantages');
analysis1Div.innerHTML=`<li>Poor build quality - thin and weak plastic body, poor pre-filter cartridge, and pump making noise while in use.</li><li>Poor customer service - no response from customer care, distributors demanding money for service, and rude customer care executives.</li><li>Poor product quality - TDS value not lowering, water not being purified, water having plastic taste, and water having bad taste.</li><li>Poor installation - water leakage from UV chamber, installation not done even after booking, and installation person asking for additional money.</li><li>Warranty issues - no warranty except motor and SMPS, no response from company side in warranty period, and not being able to claim warranty.</li>`


aiSection1.appendChild(analysis1Div);


const contentLocked = document.createElement('div')
contentLocked.setAttribute('class', 'lockdetail')
contentLocked.innerHTML='Provided analysis is a sample, Please create a free account to get live analysis of the current product reviews.'

const contentLockedSignin = document.createElement('div')
contentLockedSignin.setAttribute('class', 'lockdetail')
contentLockedSignin.innerHTML="Provided analysis is a sample, we are developing the feature right now. We'll let you know once it is completed"

const signupbtn = document.createElement('button')
signupbtn.setAttribute('class', 'NZXZk')
signupbtn.innerHTML='Register'



let authToken = await getAuthToken();

if ((authToken && authToken[constants.authTokenKey])){
  aiSection2.appendChild(contentLockedSignin);
}else{
  aiSection2.appendChild(contentLocked);
  aiSection2.appendChild(signupbtn);
}

signupbtn.onclick = async function () {
  chrome.runtime.sendMessage({ message: 'Register' });
}

  reviewsType1.onclick = async function () {
    reviewsType1.removeAttribute('class');
    reviewsType2.removeAttribute('class');
    reviewsType3.removeAttribute('class');
    reviewsType4.removeAttribute('class');
    overviewDiv.removeAttribute('class');
    allReviewDiv.removeAttribute('class');
    form.removeAttribute('class');
    form.setAttribute('class', 'cnikoG2');
    reviewsType1.setAttribute('class', 'liSWKK');
    reviewsType2.setAttribute('class', 'hiLyrj');
    reviewsType3.setAttribute('class', 'hiLyrj');
    reviewsType4.setAttribute('class', 'hiLyrj');
    overviewDiv.setAttribute('class', 'gnaJEW');
    allReviewDiv.setAttribute('class', 'epbpWv2');
    aiAnalysis.setAttribute('class', 'aiAnalysis2');
    wordCloudDiv.setAttribute('class', 'wordcloudclass');
  };
  let oneClick2 = false;
  reviewsType4.onclick = async function () {
    reviewsType1.removeAttribute('class');
    reviewsType2.removeAttribute('class');
    reviewsType3.removeAttribute('class');
    reviewsType4.removeAttribute('class');
    overviewDiv.removeAttribute('class');
    allReviewDiv.removeAttribute('class');
    form.removeAttribute('class');
    form.setAttribute('class', 'cnikoG');
    reviewsType1.setAttribute('class', 'hiLyrj');
    reviewsType2.setAttribute('class', 'hiLyrj');
    reviewsType3.setAttribute('class', 'hiLyrj');
    reviewsType4.setAttribute('class', 'liSWKK');
    overviewDiv.setAttribute('class', 'gnaJEW2');
    allReviewDiv.setAttribute('class', 'epbpWv');
    aiAnalysis.setAttribute('class', 'aiAnalysis2');
    wordCloudDiv.setAttribute('class', 'wordcloudclass');

    if (oneClick2 === false) {
      oneClick2 = true;
      reviewDiv.appendChild(loading);
      allreviewdata = await allreviewdata;
      allreviewdata = allreviewdata.allreview
      reviewDiv.removeChild(loading);
      for (let i = 0; i < Math.min(allreviewdata.length, 100); i++) {
        let newReview = ReviewGenerator(i, allreviewdata[i]);
        reviewDiv.appendChild(newReview);
        //console.log(i, allreviewdata.length);
        if (i === 99 && allreviewdata.length > 100) {
          //console.log('appended');
          reviewDiv.appendChild(showMoreBtn);
        }
      }
    }
  };
  let oneClick = false;
  reviewsType3.onclick = async function () {
    reviewsType1.removeAttribute('class');
    reviewsType2.removeAttribute('class');
    reviewsType3.removeAttribute('class');
    reviewsType4.removeAttribute('class');
    overviewDiv.removeAttribute('class');
    allReviewDiv.removeAttribute('class');
    form.removeAttribute('class');
    form.setAttribute('class', 'cnikoG2');
    allReviewDiv.setAttribute('class', 'epbpWv2');
    overviewDiv.setAttribute('class', 'gnaJEW2');
    reviewsType1.setAttribute('class', 'hiLyrj');
    reviewsType2.setAttribute('class', 'hiLyrj');
    reviewsType3.setAttribute('class', 'liSWKK');
    reviewsType4.setAttribute('class', 'hiLyrj');
    aiAnalysis.setAttribute('class', 'aiAnalysis2');
    wordCloudDiv.removeAttribute('class');
    
    if (oneClick === false) {
      oneClick = true;
      wordCloudDiv.appendChild(loading);
      wordlist = await wordlist;
      wordlist = wordlist.wordcloud;
      wordCloudDiv.removeChild(loading);
      const abc = { list: wordlist['wordCloudFrequency'] };
      WordCloud(document.getElementById('wordcloud'), abc);
    }
  };

  reviewsType2.onclick = async function () {
    reviewsType1.removeAttribute('class');
    reviewsType2.removeAttribute('class');
    reviewsType3.removeAttribute('class');
    reviewsType4.removeAttribute('class');
    overviewDiv.removeAttribute('class');
    allReviewDiv.removeAttribute('class');
    form.removeAttribute('class');
    form.setAttribute('class', 'cnikoG2');
    allReviewDiv.setAttribute('class', 'epbpWv2');
    overviewDiv.setAttribute('class', 'gnaJEW2');
    reviewsType1.setAttribute('class', 'hiLyrj');
    reviewsType2.setAttribute('class', 'liSWKK');
    reviewsType3.setAttribute('class', 'hiLyrj');
    reviewsType4.setAttribute('class', 'hiLyrj');
    aiAnalysis.setAttribute('class', 'aiAnalysis');
    
    wordCloudDiv.setAttribute('class', 'wordcloudclass');
  };
  return bodyModalPlace;
}
export default reviewNewModal;
