import ReviewGenerator from './reviewsgenerator';
import { ratingDistGenerator } from './reviewsgenerator';

async function urlGenerator() {
  const url = window.location.href;
  let newUrl = '';
  let bool = false;
  for (let i = 2; i < url.length; i++) {
    if (bool === true) {
      newUrl += url[i];
    }
    if (url[i - 2] === 'c' && url[i - 1] === 'o' && url[i] === 'm') {
      bool = true;
    }
    if (url[i + 1] === '/' && url[i + 2] === 'p' && url[i + 3] === '/') {
      newUrl += '/product-reviews/';
      i += 3;
    }
    if (
      url[i + 1] === '&' &&
      url[i + 2] === 'm' &&
      url[i + 3] === 'a' &&
      url[i + 4] === 'r'
    ) {
      break;
    }
  }

  return newUrl;
}

function getProductTitle() {
  const url = window.location.href;
  // split the url by '/'
  const urlSplit = url.split('/');
  // get the product title
  return urlSplit[3];
}

async function reviewModal() {
  let updatedUrl = await urlGenerator();
  console.log(updatedUrl);
  let url = 'https://www.datavio.co/api/ratings-reviews';
  let body = { url: `${updatedUrl}` };
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response.json();
}

async function allReviewData(conditions) {
  let updatedUrl = await urlGenerator();
  let url = 'https://www.datavio.co/api/get-reviews';
  let body = {
    url: `${updatedUrl}&marketplace=FLIPKART`,
    conditions: conditions,
  };
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return response.json();
}

async function reviewNewModal() {
  const modal = document.createElement('div');
  modal.setAttribute('id', 'review-modal');

  const apiData = await reviewModal();

  console.log(apiData);

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
  productNameDetail.innerText = getProductTitle();

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
  reviewsType2.setAttribute('class', 'hiLyrj');

  const reviewsTypeTitle2 = document.createElement('div');
  reviewsTypeTitle2.setAttribute('class', 'gsckYT');
  reviewsTypeTitle2.innerHTML = 'All Reviews';

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

  reviewsType3.appendChild(reviewsTypeTitle3);
  reviewsType3.appendChild(menuBorder3);
  reviewsDiv3.appendChild(reviewsType3);
  contentDiv.appendChild(contentTop);
  contentTop.appendChild(reviewsDiv1);
  contentTop.appendChild(reviewsDiv2);
  contentTop.appendChild(reviewsDiv3);
  bodyBody.appendChild(contentDiv);
  bodyBody.appendChild(productDetails);

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

  let content = [];
  let allreviewdata = await allReviewData(content);
  console.log(allreviewdata);

  applyBtn.onclick = async function (e) {
    e.preventDefault();
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
    content.push(arrayObj);
    content.push(verifiedObj);
    content.push(keywordObj);
    console.log(verifiedBool);
    console.log(keywordValue);
    console.log(selectedStar);
    allreviewdata = await allReviewData(content);
    console.log(allreviewdata);
    reviewDiv.innerHTML = '';
    for (let i = 0; i < Math.min(allreviewdata.length, 100); i++) {
      let newReview = ReviewGenerator(i, allreviewdata[i]);
      reviewDiv.appendChild(newReview);
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

  const overviewDiv2 = document.createElement('div');
  overviewSplitDiv.appendChild(overviewDiv2);

  const overviewRightDiv = document.createElement('div');
  overviewRightDiv.setAttribute('class', 'epbpWv');

  overviewDiv2.appendChild(overviewRightDiv);

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

  for (let i = 0; i < Math.min(allreviewdata.length, 100); i++) {
    let newReview = ReviewGenerator(i, allreviewdata[i]);
    reviewDiv.appendChild(newReview);
  }

  reviewsType1.onclick = async function () {
    reviewsType1.removeAttribute('class');
    reviewsType2.removeAttribute('class');
    reviewsType3.removeAttribute('class');
    overviewDiv.removeAttribute('class');
    allReviewDiv.removeAttribute('class');
    form.removeAttribute('class');
    form.setAttribute('class', 'cnikoG2');
    reviewsType1.setAttribute('class', 'liSWKK');
    reviewsType2.setAttribute('class', 'hiLyrj');
    reviewsType3.setAttribute('class', 'hiLyrj');
    overviewDiv.setAttribute('class', 'gnaJEW');
    allReviewDiv.setAttribute('class', 'epbpWv2');
  };
  reviewsType2.onclick = async function () {
    reviewsType1.removeAttribute('class');
    reviewsType2.removeAttribute('class');
    reviewsType3.removeAttribute('class');
    overviewDiv.removeAttribute('class');
    allReviewDiv.removeAttribute('class');
    form.removeAttribute('class');
    form.setAttribute('class', 'cnikoG');
    reviewsType1.setAttribute('class', 'hiLyrj');
    reviewsType2.setAttribute('class', 'liSWKK');
    reviewsType3.setAttribute('class', 'hiLyrj');
    overviewDiv.setAttribute('class', 'gnaJEW2');
    allReviewDiv.setAttribute('class', 'epbpWv');
  };
  reviewsType3.onclick = async function () {
    reviewsType1.removeAttribute('class');
    reviewsType2.removeAttribute('class');
    reviewsType3.removeAttribute('class');
    overviewDiv.removeAttribute('class');
    allReviewDiv.removeAttribute('class');
    form.removeAttribute('class');
    form.setAttribute('class', 'cnikoG2');
    allReviewDiv.setAttribute('class', 'epbpWv2');
    overviewDiv.setAttribute('class', 'gnaJEW2');
    reviewsType1.setAttribute('class', 'hiLyrj');
    reviewsType2.setAttribute('class', 'hiLyrj');
    reviewsType3.setAttribute('class', 'liSWKK');
  };
  return modal;
}
export default reviewNewModal;
