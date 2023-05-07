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

//Date
const filter = document.createElement('div');
filter.setAttribute('class', 'jvntzP');

const mainDiv = document.createElement('div');
mainDiv.setAttribute('class', 'sc-jSUnYo kiqpP');

const dateRangeDiv = document.createElement('div');
dateRangeDiv.setAttribute('class', 'sc-cXKCzB bSssay');

const dateInputDiv = document.createElement('div');
dateInputDiv.setAttribute('data-testid', 'control-dateInput');
dateInputDiv.setAttribute('class', 'sc-fQhdLw ktAmda');
dateInputDiv.setAttribute('aria-expanded', 'false');

const dateInputWrapperDiv = document.createElement('div');
dateInputWrapperDiv.setAttribute('class', 'sc-httYss fXWfqw sc-cvAOhJ eTjXPv');

const dateInputFieldDiv = document.createElement('div');
dateInputFieldDiv.setAttribute('class', 'sc-dkIXZx sc-fWPcWZ gtgZQm bpAFPj');

const dateInput = document.createElement('input');
dateInput.setAttribute('placeholder', 'Select the date range');
dateInput.setAttribute('class', 'sc-XhUvE sc-jXktde kkDNaA');
dateInput.setAttribute('value', '');

dateInputFieldDiv.appendChild(dateInput);
dateInputWrapperDiv.appendChild(dateInputFieldDiv);
dateInputDiv.appendChild(dateInputWrapperDiv);
dateRangeDiv.appendChild(dateInputDiv);

const filterDiv = document.createElement('div');
filterDiv.setAttribute('class', 'sc-fUfnfA ckHJBG');

const filterDropdownDiv = document.createElement('div');
filterDropdownDiv.setAttribute('class', 'sc-flPZYa lerQSN');

const filterBtnDiv = document.createElement('div');
filterBtnDiv.setAttribute('data-open', 'false');
filterBtnDiv.setAttribute('tabindex', '0');
filterBtnDiv.setAttribute('class', 'sc-gsxFXZ hNeyOA');
filterBtnDiv.setAttribute('aria-expanded', 'false');

const filterTextDiv = document.createElement('div');
filterTextDiv.setAttribute('class', 'sc-dmaBdM jMlZvI');

const filterText = document.createElement('span');
filterText.setAttribute('class', 'sc-kIjwQX hlNbkn');
filterText.innerHTML = 'Select filters';

filterTextDiv.appendChild(filterText);
filterBtnDiv.appendChild(filterTextDiv);
filterDropdownDiv.appendChild(filterBtnDiv);
filterDiv.appendChild(filterDropdownDiv);

const clearBtn = document.createElement('div');
clearBtn.setAttribute('class', 'sc-dWddBi jSmkTg');
clearBtn.innerHTML = '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="star" class="svg-inline--fa fa-star sc-lfnXyL fhmLEe" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M287.9 0C297.1 0 305.5 5.25 309.5 13.52L378.1 154.8L531.4 177.5C540.4 178.8 547.8 185.1 550.7 193.7C553.5 202.4 551.2 211.9 544.8 218.2L433.6 328.4L459.9 483.9C461.4 492.9 457.7 502.1 450.2 507.4C442.8 512.7 432.1 513.4 424.9 509.1L287.9 435.9L150.1 509.1C142.9 513.4 133.1 512.7 125.6 507.4C118.2 502.1 114.5 492.9 115.1 483.9L142.2 328.4L31.11 218.2C24.65 211.9 22.36 202.4 25.2 193.7C28.03 185.1 35.5 178.8 44.49 177.5L197.7 154.8L266.3 13.52C270.4 5.249 278.7 0 287.9 0L287.9 0zM287.9 78.95L235.4 187.2C231.9 194.3 225.1 199.3 217.3 200.5L98.98 217.9L184.9 303C190.4 308.5 192.9 316.4 191.6 324.1L171.4 443.7L276.6 387.5C283.7 383.7 292.2 383.7 299.2 387.5L404.4 443.7L384.2 324.1C382.9 316.4 385.5 308.5 391 303L476.9 217.9L358.6 200.5C350.7 199.3 343.9 194.3 340.5 187.2L287.9 78.95z"></path></svg>';

const applyBtn = document.createElement('button');
applyBtn.setAttribute('class', 'sc-dWddBi NZXZk');
applyBtn.innerHTML = 'Apply Filters';

mainDiv.appendChild(dateRangeDiv);
mainDiv.appendChild(filterDiv);
mainDiv.appendChild(clearBtn);
mainDiv.appendChild(applyBtn);
filter.appendChild(mainDiv);

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

  //Review 2
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
