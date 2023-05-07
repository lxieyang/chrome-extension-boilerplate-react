import ReviewGenerator from "./reviewsgenerator";

const modal = document.createElement('div');
modal.setAttribute('id', 'review-modal');

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
bodyHeaderHeading.innerText = 'Total Reviews 83';

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
productDetails.appendChild(productName)

const productNameDetail = document.createElement('div');
productNameDetail.setAttribute('class', 'dydjeI');
productNameDetail.innerText = 'Redmi 12C (Royal Blue, 4GB RAM, 64GB Storage) | High Performance Mediatek Helio G85 | Big 17cm(6.71) HD+ Display with 5000mAh(typ) Battery with 10W Charger in-Box 83';

productName.appendChild(productNameDetail)

const contentDiv = document.createElement('div');
contentDiv.setAttribute('class', 'dLsaGN');

const contentTop = document.createElement('div');
contentTop.setAttribute('class', 'didbWK');

const menuBorder1 = document.createElement('div');
menuBorder1.setAttribute('class', 'cRbJA A');
const menuBorder2= document.createElement('div');
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
reviewsTypeTitle3.innerHTML = 'All Questions';

reviewsType3.appendChild(reviewsTypeTitle3);
reviewsType3.appendChild(menuBorder3);
reviewsDiv3.appendChild(reviewsType3);

const reviewsDiv4 = document.createElement('div');
reviewsDiv4.setAttribute('class', 'bzssCu');

const reviewsType4 = document.createElement('div');
reviewsType4.setAttribute('tabindex', '0');
reviewsType4.setAttribute('class', 'hiLyrj');

const reviewsTypeTitle4 = document.createElement('div');
reviewsTypeTitle4.setAttribute('class', 'gsckYT');
reviewsTypeTitle4.innerHTML = 'Review Analysis';

reviewsType4.appendChild(reviewsTypeTitle4);
reviewsType4.appendChild(menuBorder4);
reviewsDiv4.appendChild(reviewsType4);

const reviewsDiv5 = document.createElement('div');
reviewsDiv5.setAttribute('class', 'bzssCu');

const reviewsType5 = document.createElement('div');
reviewsType5.setAttribute('tabindex', '0');
reviewsType5.setAttribute('class', 'hiLyrj');

const reviewsTypeTitle5 = document.createElement('div');
reviewsTypeTitle5.setAttribute('class', 'gsckYT');
reviewsTypeTitle5.innerHTML = 'Product Variations';

reviewsType5.appendChild(reviewsTypeTitle5);
reviewsType5.appendChild(menuBorder5);
reviewsDiv5.appendChild(reviewsType5);

contentDiv.appendChild(contentTop)
contentTop.appendChild(reviewsDiv1);
contentTop.appendChild(reviewsDiv2);
contentTop.appendChild(reviewsDiv3);
contentTop.appendChild(reviewsDiv4);
contentTop.appendChild(reviewsDiv5);
bodyBody.appendChild(contentDiv);
bodyBody.appendChild(productDetails);

//Filters

const form = document.createElement('form')
form.setAttribute('class', 'cnikoG')

bodyBody.appendChild(form);

const filtersDiv = document.createElement('div')
filtersDiv.setAttribute('class', 'IGmAC')

form.appendChild(filtersDiv);

const allFilter = document.createElement('div');
allFilter.setAttribute('class', 'iaZWuG');

filtersDiv.appendChild(allFilter);

const selectRating = document.createElement('div');
selectRating.setAttribute('class','lerQSN');

allFilter.appendChild(selectRating);

const dropdown = document.createElement('div');
dropdown.setAttribute('class', 'hNeyOA')
dropdown.setAttribute('data-open', 'false')

selectRating.appendChild(dropdown);

const allDropdown = document.createElement('div');
allDropdown.setAttribute('class', 'sc-dmaBdM jMlZvI')

dropdown.appendChild(allDropdown);

const dropdownIcon = document.createElement('span');
dropdownIcon.setAttribute('class', 'sc-fWSMSg cgJLBi');
dropdownIcon.innerHTML='<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="angle-down" class="svg-inline--fa fa-angle-down " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M360.5 217.5l-152 143.1C203.9 365.8 197.9 368 192 368s-11.88-2.188-16.5-6.562L23.5 217.5C13.87 208.3 13.47 193.1 22.56 183.5C31.69 173.8 46.94 173.5 56.5 182.6L192 310.9l135.5-128.4c9.562-9.094 24.75-8.75 33.94 .9375C370.5 193.1 370.1 208.3 360.5 217.5z"></path></svg>';
dropdown.appendChild(dropdownIcon);

const dropdownMenu = document.createElement('div');
dropdownMenu.setAttribute('class', 'abcdef');
dropdownMenu.innerHTML='<div data-placement="bottom-start" data-testid="undefined-dropdown"><div class="sc-eixvJN bdtKyo"><div class="sc-fOuYhK gTyetu"><div data-grouped="false" class="sc-fZKIUC fOYJlQ"><div role="option" data-value="5" class="sc-gIwoD HBZlb"><span class="sc-chCsht elxNIY"></span><span class="sc-cUOIGw kkzglY">5 stars only</span></div><div role="option" data-value="4" class="sc-gIwoD HBZlb"><span class="sc-chCsht elxNIY"></span><span class="sc-cUOIGw kkzglY">4 stars only</span></div><div role="option" data-value="3" class="sc-gIwoD HBZlb"><span class="sc-chCsht elxNIY"></span><span class="sc-cUOIGw kkzglY">3 stars only</span></div><div role="option" data-value="2" class="sc-gIwoD HBZlb"><span class="sc-chCsht elxNIY"></span><span class="sc-cUOIGw kkzglY">2 stars only</span></div><div role="option" data-value="1" class="sc-gIwoD HBZlb"><span class="sc-chCsht elxNIY"></span><span class="sc-cUOIGw kkzglY">1 star only</span></div></div></div></div></div>'

const dropdownBtn = document.createElement('span');
dropdownBtn.setAttribute('class', 'hlNbkn')
dropdownBtn.setAttribute('data-open', 'false')
dropdownBtn.innerHTML='Select Ratings'

allDropdown.appendChild(dropdownBtn);

let bool = false;
dropdown.onclick = async function () {
bool=!bool;
if(bool===true)
{
  dropdown.removeAttribute('class')
  dropdown.setAttribute('class', 'dsigvn')
  selectRating.appendChild(dropdownMenu)
  dropdownBtn.removeAttribute('data-open')
  dropdownBtn.setAttribute('data-open', 'true')
}
else{
  dropdown.removeAttribute('class')
  dropdown.setAttribute('class', 'hNeyOA')
  selectRating.removeChild(dropdownMenu)
  dropdownBtn.removeAttribute('data-open')
  dropdownBtn.setAttribute('data-open', 'false')
}
}


const selectVerified = document.createElement('div');
selectVerified.setAttribute('class','lerQSN');

allFilter.appendChild(selectVerified);

const verified = document.createElement('div');
verified.setAttribute('class', 'hNeyOA')

selectVerified.appendChild(verified);

const checkVerified = document.createElement('div');
checkVerified.setAttribute('class', 'HBZlb')

verified.appendChild(checkVerified);

const checkbox = document.createElement('span');
checkbox.setAttribute('class', 'elxNIY')

checkVerified.appendChild(checkbox)

const checkboxName = document.createElement('span');
checkboxName.setAttribute('class', 'kkzglY')
checkboxName.innerHTML='Verified'

checkVerified.appendChild(checkboxName);

let bool2 = false;
verified.onclick= async function () {
bool2 =!bool2;
if(bool2 === true)
{
  checkVerified.removeAttribute('class')
  checkVerified.setAttribute('class', 'tAYZw')
  checkbox.removeAttribute('class')
  checkbox.setAttribute('class', 'kJQLCS')
  checkbox.innerHTML='<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="check" class="svg-inline--fa fa-check sc-iExEVL dMAoiw" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M440.1 103C450.3 112.4 450.3 127.6 440.1 136.1L176.1 400.1C167.6 410.3 152.4 410.3 143 400.1L7.029 264.1C-2.343 255.6-2.343 240.4 7.029 231C16.4 221.7 31.6 221.7 40.97 231L160 350.1L407 103C416.4 93.66 431.6 93.66 440.1 103V103z"></path></svg>'
}
else{
  checkVerified.removeAttribute('class')
  checkVerified.setAttribute('class', 'HBZlb')
  checkbox.removeAttribute('class')
  checkbox.setAttribute('class', 'elxNIY')
  checkbox.innerHTML='';
}

}


const enterKeyword = document.createElement('div');
enterKeyword.setAttribute('class','lerQSN');

allFilter.appendChild(enterKeyword);

const keywordDiv = document.createElement('div');
keywordDiv.setAttribute('class', 'hNeyOA')

enterKeyword.appendChild(keywordDiv);

const keyword = document.createElement('input');
keyword.setAttribute('class', 'kkDNaA')
keyword.setAttribute('placeholder', 'Enter a Keyword')

keywordDiv.appendChild(keyword);


const clearBtn = document.createElement('div');
clearBtn.setAttribute('class', 'sc-dWddBi jSmkTg');
clearBtn.innerHTML = 'Clear';

const applyBtn = document.createElement('button');
applyBtn.setAttribute('class', 'sc-dWddBi NZXZk');
applyBtn.innerHTML = 'Apply Filters';

allFilter.appendChild(clearBtn);
allFilter.appendChild(applyBtn);




//Overview

  const overviewDiv = document.createElement('div');
  overviewDiv.setAttribute('class', 'gnaJEW')

  const overviewSplitDiv = document.createElement('div');
  overviewSplitDiv.setAttribute('class', 'gxxFEr')

  const overviewLeftDiv = document.createElement('div');
  overviewLeftDiv.setAttribute('class', 'jBOLsP')

  const overviewTableDiv = document.createElement('div');
  overviewTableDiv.setAttribute('class', 'hhdZCl')

  const tableWrapper = document.createElement('div');
  tableWrapper.setAttribute('class', 'jWPjfx')

  const tableWrapper2 = document.createElement('div');
  tableWrapper2.setAttribute('class', 'cfrHHF')

  const tableGrids = document.createElement('div');
  tableGrids.setAttribute('class', 'jJAKYt')

  const column1 = document.createElement('div')
  column1.setAttribute('style', 'display: contents;')
  const column2 = document.createElement('div')
  column2.setAttribute('style', 'display: contents;')
  const column3 = document.createElement('div')
  column3.setAttribute('style', 'display: contents;')
  const column4 = document.createElement('div')
  column4.setAttribute('style', 'display: contents;')

  //Rating
  const rating = document.createElement('div')
  rating.setAttribute('class', 'dZrlxP HHhCc bbPTwY')

  const ratingName = document.createElement('div')
  ratingName.setAttribute('class', 'bimpkv')
  ratingName.innerHTML= 'Rating'

  //Rating count
  const ratingCount = document.createElement('div')
  ratingCount.setAttribute('class', 'fRhIzs HHhCc bbPTwY')

  const ratingCountDiv = document.createElement('div')
  ratingCountDiv.setAttribute('class', 'eUFYmb')

  const ratingCountName = document.createElement('div')
  ratingCountName.setAttribute('class', 'uXEUb')
  ratingCountName.innerHTML= 'Rating Count'

  //Distribution

  const distribution = document.createElement('div')
  distribution.setAttribute('class', 'fRhIzs HHhCc bbPTwY')

  const distributionName = document.createElement('div')
  distributionName.setAttribute('class', 'eUFymb')
  distributionName.innerHTML= 'Distribution'

  //See All

  const seeAll = document.createElement('div')
  seeAll.setAttribute('class', 'fRhIzs HHhCc bbPTwY')

  const seeAllDiv = document.createElement('div')
  seeAllDiv.setAttribute('class', 'GtsQR')

  rating.appendChild(ratingName);
  column1.appendChild(rating);
  distribution.appendChild(distributionName);
  column3.appendChild(distribution);
  ratingCountDiv.appendChild(ratingCountName);
  ratingCount.appendChild(ratingCountDiv);
  column2.appendChild(ratingCount);
  seeAll.appendChild(seeAllDiv);
  column4.appendChild(seeAll);

  tableGrids.appendChild(column1);
  tableGrids.appendChild(column2);
  tableGrids.appendChild(column3);
  tableGrids.appendChild(column4);

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
  overviewRightDiv.setAttribute('class','epbpWv');

  overviewDiv2.appendChild(overviewRightDiv);

  const overviewTopTitle = document.createElement('div');
  overviewTopTitle.setAttribute('class','bgGCiT');
  overviewTopTitle.innerHTML='Top Helpful Review';

  let overviewReviewDiv = document.createElement('div');
  overviewReviewDiv.setAttribute('class','gtKjyK');

  overviewRightDiv.appendChild(overviewTopTitle);
  overviewRightDiv.appendChild(overviewReviewDiv);


//Review 1
  const overviewReview1 = document.createElement('div');
  overviewReview1.setAttribute('class','iynKDA');

  overviewReviewDiv.appendChild(overviewReview1);

  const overviewReviewTitle = document.createElement('div');
  overviewReviewTitle.setAttribute('class','ixxElA');

  overviewReview1.appendChild(overviewReviewTitle);

  const overviewReviewTitleText = document.createElement('a');
  overviewReviewTitleText.setAttribute('class','udqtB');
  overviewReviewTitleText.innerHTML='Over all Review of the Redmi 12 C phone.'

  overviewReviewTitle.appendChild(overviewReviewTitleText);

  const overviewReviewUser = document.createElement('div');
  overviewReviewUser.setAttribute('class','ixxElA');

  overviewReview1.appendChild(overviewReviewUser);

  const overviewReviewUserDetail = document.createElement('div');
  overviewReviewUserDetail.setAttribute('class','fpVYlo');
  overviewReviewUserDetail.innerHTML='By Rohit, Reviewed in India 🇮🇳 on 25 April 2023'

  overviewReviewUser.appendChild(overviewReviewUserDetail);

  const overviewReviewDetail = document.createElement('div');
  overviewReviewDetail.setAttribute('class','kqSYrC');
  overviewReviewDetail.innerHTML="PROS:-Decent camera at this price range.Good Speed.The display quality is excellent.The fingerprint is working properly &amp; smoothly.smooth touch screen.Excellent battery backup.CONS:-Back Panel quality bit poor.Sound a bit low (enough for normal use).To many inbuilt (unnecessary) apps.They didn't provide a back cover for the phone.Turbo Charger or C type is not provided."

  overviewReview1.appendChild(overviewReviewDetail);

  const overviewReviewHelpful = document.createElement('div');
  overviewReviewHelpful.setAttribute('class','ekqgTH');
  overviewReviewHelpful.innerHTML='35 people found this helpful'
  overviewReview1.appendChild(overviewReviewHelpful);

 const data = [{
  "description": "Reviewing after one month use \nNice and handy phone with 6.4 display\nCompact size.\nCamera 📷 is mind blowing 🔥🔥\nBattery life is ok\nDisplay is amazing with victous glass protection which is best in market\nFor normal use its a best phone with amazing features and customisation",
  "title": "Great product",
  "rating": 5,
  "total_votes": 11405,
  "upvote": 10807,
  "downvote": 598,
  "city": "Haridwar",
  "state": "Uttrakhand",
  "author": "Udit Joshi",
  "verified": true,
  "created_on": "6 months ago"
},
{
  "description": "Using since last 10 days and super happy with the purchase, also prompt delivery by flipkart,what an amazing camera,display and lovely one UI,received immediate android 13 one UI 5 update,overall happy and satisfied with my purchase.",
  "title": "Awesome",
  "rating": 5,
  "total_votes": 4711,
  "upvote": 4378,
  "downvote": 333,
  "city": "Matheran",
  "state": "Maharashtra",
  "author": "Flipkart Customer",
  "verified": true,
  "created_on": "4 months ago"
},
{
  "description": "It is a great mobile, its camera is exactly like a flagship, can not get a better mobile in this range.",
  "title": "Must buy!",
  "rating": 5,
  "total_votes": 5608,
  "upvote": 5144,
  "downvote": 464,
  "city": "New Delhi",
  "state": "Delhi",
  "author": "Sandeep  Rai",
  "verified": true,
  "created_on": "6 months ago"
}]


  for(let i=0;i<data.length; i++){
    let newReview = ReviewGenerator(i, data[i]);
     overviewReviewDiv.appendChild(newReview);
  }

  // All Reviews
  const allReviewDiv = document.createElement('div');
  allReviewDiv.setAttribute('class','epbpWv2');

  bodyBody.appendChild(allReviewDiv);

  const reviewTitle = document.createElement('div');
  reviewTitle.setAttribute('class','bgGCiT');
  reviewTitle.innerHTML='All Reviews';

  const reviewDiv = document.createElement('div');
  reviewDiv.setAttribute('class','gtKjyK');

  allReviewDiv.appendChild(reviewTitle);
  allReviewDiv.appendChild(reviewDiv);

  for(let i=0;i<data.length; i++){
    let newReview = ReviewGenerator(i, data[i]);
     reviewDiv.appendChild(newReview);
  }

  allReviewDiv.appendChild(reviewDiv);

    reviewsType1.onclick = async function () {
    reviewsType1.removeAttribute('class');
    reviewsType2.removeAttribute('class');
    reviewsType3.removeAttribute('class');
    reviewsType4.removeAttribute('class');
    reviewsType5.removeAttribute('class');
    overviewDiv.removeAttribute('class')
    allReviewDiv.removeAttribute('class');
    reviewsType1.setAttribute('class', 'liSWKK');
    reviewsType2.setAttribute('class', 'hiLyrj');
    reviewsType3.setAttribute('class', 'hiLyrj');
    reviewsType4.setAttribute('class', 'hiLyrj');
    reviewsType5.setAttribute('class', 'hiLyrj');
    overviewDiv.setAttribute('class', 'gnaJEW');
    allReviewDiv.setAttribute('class', 'epbpWv2')
  };
  reviewsType2.onclick = async function () {
    reviewsType1.removeAttribute('class');
    reviewsType2.removeAttribute('class');
    reviewsType3.removeAttribute('class');
    reviewsType4.removeAttribute('class');
    reviewsType5.removeAttribute('class');
    overviewDiv.removeAttribute('class')
    allReviewDiv.removeAttribute('class');
    reviewsType1.setAttribute('class', 'hiLyrj');
    reviewsType2.setAttribute('class', 'liSWKK');
    reviewsType3.setAttribute('class', 'hiLyrj');
    reviewsType4.setAttribute('class', 'hiLyrj');
    reviewsType5.setAttribute('class', 'hiLyrj');
    overviewDiv.setAttribute('class', 'gnaJEW2');
    allReviewDiv.setAttribute('class','epbpWv');
  };
  reviewsType3.onclick = async function () {
    reviewsType1.removeAttribute('class');
    reviewsType2.removeAttribute('class');
    reviewsType3.removeAttribute('class');
    reviewsType4.removeAttribute('class');
    reviewsType5.removeAttribute('class');
    reviewsType1.setAttribute('class', 'hiLyrj');
    reviewsType2.setAttribute('class', 'hiLyrj');
    reviewsType3.setAttribute('class', 'liSWKK');
    reviewsType4.setAttribute('class', 'hiLyrj');
    reviewsType5.setAttribute('class', 'hiLyrj');
  };
  reviewsType4.onclick = async function () {
    reviewsType1.removeAttribute('class');
    reviewsType2.removeAttribute('class');
    reviewsType3.removeAttribute('class');
    reviewsType4.removeAttribute('class');
    reviewsType5.removeAttribute('class');
    reviewsType1.setAttribute('class', 'hiLyrj');
    reviewsType2.setAttribute('class', 'hiLyrj');
    reviewsType3.setAttribute('class', 'hiLyrj');
    reviewsType4.setAttribute('class', 'liSWKK');
    reviewsType5.setAttribute('class', 'hiLyrj');
  };
  reviewsType5.onclick = async function () {
    reviewsType1.removeAttribute('class');
    reviewsType2.removeAttribute('class');
    reviewsType3.removeAttribute('class');
    reviewsType4.removeAttribute('class');
    reviewsType5.removeAttribute('class');
    reviewsType1.setAttribute('class', 'hiLyrj');
    reviewsType2.setAttribute('class', 'hiLyrj');
    reviewsType3.setAttribute('class', 'hiLyrj');
    reviewsType4.setAttribute('class', 'hiLyrj');
    reviewsType5.setAttribute('class', 'liSWKK');
  };

export default modal;
