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

bodyHeader.appendChild(bodyHeaderHeading);
//body body
const bodyBody = document.createElement('div');
bodyBody.setAttribute('class', 'cTeFoo');

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
bodyBody.appendChild(contentTop);
bodyBody.appendChild(productDetails);

bodyModalPlace1.appendChild(bodyHeader);
bodyModalPlace1.appendChild(bodyBody);
bodyModalPlace.appendChild(bodyModalPlace1);

body.appendChild(bodyModalPlace);

modalClass2.appendChild(body);
header.appendChild(closeModal);
modalClass2.appendChild(header);

    reviewsType1.onclick = async function () {
    reviewsType1.removeAttribute('class');
    reviewsType2.removeAttribute('class');
    reviewsType3.removeAttribute('class');
    reviewsType4.removeAttribute('class');
    reviewsType5.removeAttribute('class');
    reviewsType1.setAttribute('class', 'liSWKK');
    reviewsType2.setAttribute('class', 'hiLyrj');
    reviewsType3.setAttribute('class', 'hiLyrj');
    reviewsType4.setAttribute('class', 'hiLyrj');
    reviewsType5.setAttribute('class', 'hiLyrj');
  };
  reviewsType2.onclick = async function () {
    reviewsType1.removeAttribute('class');
    reviewsType2.removeAttribute('class');
    reviewsType3.removeAttribute('class');
    reviewsType4.removeAttribute('class');
    reviewsType5.removeAttribute('class');
    reviewsType1.setAttribute('class', 'hiLyrj');
    reviewsType2.setAttribute('class', 'liSWKK');
    reviewsType3.setAttribute('class', 'hiLyrj');
    reviewsType4.setAttribute('class', 'hiLyrj');
    reviewsType5.setAttribute('class', 'hiLyrj');
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
