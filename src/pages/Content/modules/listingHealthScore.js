import getListingData from './scrapers/listingScraper';



const ListingModal = async () => {
const map= await getListingData();
// console.log(map);
const superDiv = document.createElement('div')
superDiv.setAttribute('class', 'super')

const listingMainDiv = document.createElement('div');
listingMainDiv.setAttribute('id', 'listing-modal');
listingMainDiv.setAttribute('class', 'fOhaxO');




let color;
if(map["totalScore"] >=8)
color ='green'
if(map.totalScore >=5 && map.totalScore < 8)
color ='yellow'
if(map.totalScore <5)
color ='red'


const subDiv = document.createElement('div')
subDiv.setAttribute('class', 'dMMEUY')
subDiv.innerHTML=`<?xml version="1.0" encoding="UTF-8"?> <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="51px" height="20px" style="background-color:white" viewBox="0 0 50 20" version="1.1"> <g id="surface1"> <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 0.652344 0.917969 C 0.632812 0.96875 0.625 5.132812 0.632812 10.167969 L 0.652344 19.324219 L 49.386719 19.324219 L 49.386719 0.871094 L 25.035156 0.847656 C 5.589844 0.835938 0.675781 0.847656 0.652344 0.917969 Z M 49.007812 10.097656 L 49.007812 18.941406 L 1.03125 18.941406 L 1.03125 1.253906 L 49.007812 1.253906 Z M 49.007812 10.097656 "/> <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 1.960938 2.382812 C 1.941406 2.429688 1.933594 5.933594 1.941406 10.167969 L 1.960938 17.863281 L 15.570312 17.882812 L 29.183594 17.898438 L 29.183594 2.296875 L 15.589844 2.296875 C 4.777344 2.296875 1.980469 2.320312 1.960938 2.382812 Z M 8.09375 5.640625 C 8.851562 5.738281 9.3125 5.945312 9.800781 6.40625 C 10.285156 6.867188 10.59375 7.417969 10.785156 8.148438 C 10.953125 8.773438 10.953125 10.304688 10.785156 10.933594 C 10.429688 12.269531 9.78125 13.015625 8.652344 13.390625 C 8.273438 13.515625 8.003906 13.539062 6.320312 13.566406 L 4.40625 13.59375 L 4.40625 5.570312 L 6.007812 5.570312 C 6.882812 5.570312 7.828125 5.605469 8.09375 5.640625 Z M 19.546875 6.789062 L 19.546875 7.800781 L 20.511719 7.800781 L 20.511719 8.566406 L 19.546875 8.566406 L 19.546875 10.5 C 19.546875 12.765625 19.535156 12.707031 20.121094 12.703125 L 20.5 12.703125 L 20.558594 13.105469 C 20.601562 13.335938 20.601562 13.53125 20.566406 13.550781 C 20.53125 13.574219 20.339844 13.605469 20.140625 13.628906 C 19.605469 13.683594 19.128906 13.550781 18.851562 13.257812 L 18.621094 13.015625 L 18.597656 10.785156 L 18.578125 8.566406 L 17.828125 8.566406 L 17.828125 7.804688 L 18.191406 7.785156 L 18.550781 7.765625 L 18.585938 7.046875 L 18.621094 6.332031 L 19.03125 6.058594 C 19.257812 5.914062 19.464844 5.785156 19.5 5.785156 C 19.527344 5.78125 19.546875 6.234375 19.546875 6.789062 Z M 15.589844 7.765625 C 16.132812 7.910156 16.480469 8.148438 16.671875 8.515625 C 16.824219 8.796875 16.828125 8.90625 16.871094 10.863281 C 16.90625 12.515625 16.941406 12.980469 17.027344 13.222656 C 17.089844 13.390625 17.140625 13.539062 17.140625 13.558594 C 17.140625 13.574219 16.917969 13.578125 16.644531 13.566406 L 16.148438 13.542969 L 16.050781 13.21875 L 15.960938 12.882812 L 15.617188 13.125 C 15.046875 13.523438 14.578125 13.667969 13.871094 13.667969 C 12.953125 13.667969 12.417969 13.40625 12.09375 12.777344 C 11.886719 12.386719 11.894531 11.699219 12.09375 11.308594 C 12.425781 10.675781 12.914062 10.433594 14.226562 10.230469 C 14.75 10.152344 15.335938 10.046875 15.523438 10 L 15.867188 9.917969 L 15.867188 9.535156 C 15.867188 8.773438 15.410156 8.46875 14.386719 8.507812 C 13.65625 8.539062 13.46875 8.640625 13.214844 9.179688 L 13.042969 9.546875 L 12.597656 9.5 C 12.347656 9.476562 12.136719 9.441406 12.121094 9.429688 C 12.058594 9.375 12.257812 8.859375 12.445312 8.574219 C 12.734375 8.132812 13.285156 7.828125 13.972656 7.707031 C 14.386719 7.640625 15.21875 7.667969 15.589844 7.765625 Z M 25.097656 7.863281 C 25.515625 8.042969 25.757812 8.285156 25.929688 8.667969 C 26.027344 8.90625 26.054688 9.253906 26.085938 11.003906 C 26.121094 12.730469 26.148438 13.097656 26.246094 13.316406 L 26.363281 13.578125 L 25.335938 13.578125 L 25.269531 13.316406 C 25.226562 13.175781 25.191406 13.015625 25.191406 12.964844 C 25.191406 12.847656 25.171875 12.855469 24.730469 13.160156 C 24.519531 13.320312 24.167969 13.496094 23.953125 13.558594 C 23.453125 13.710938 22.640625 13.710938 22.183594 13.550781 C 21.773438 13.414062 21.332031 12.972656 21.199219 12.578125 C 21.0625 12.152344 21.136719 11.558594 21.378906 11.164062 C 21.6875 10.65625 22.210938 10.410156 23.390625 10.238281 C 24.675781 10.035156 24.980469 9.964844 25.046875 9.832031 C 25.117188 9.695312 25.046875 9.15625 24.929688 8.933594 C 24.695312 8.503906 23.480469 8.335938 22.851562 8.648438 C 22.605469 8.773438 22.507812 8.886719 22.371094 9.179688 L 22.199219 9.554688 L 21.785156 9.503906 C 21.558594 9.484375 21.351562 9.441406 21.324219 9.414062 C 21.25 9.339844 21.585938 8.566406 21.800781 8.34375 C 22.027344 8.097656 22.578125 7.820312 22.988281 7.730469 C 23.164062 7.695312 23.625 7.675781 24.023438 7.6875 C 24.585938 7.703125 24.820312 7.742188 25.097656 7.863281 Z M 25.097656 7.863281 "/> <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 5.4375 9.566406 L 5.4375 12.605469 L 6.667969 12.605469 C 7.703125 12.605469 7.972656 12.582031 8.34375 12.464844 C 9.339844 12.160156 9.84375 11.167969 9.84375 9.539062 C 9.84375 8.34375 9.617188 7.652344 9.039062 7.089844 C 8.570312 6.628906 8.398438 6.585938 6.835938 6.558594 L 5.4375 6.53125 Z M 5.4375 9.566406 "/> <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 15.246094 10.835938 C 14.910156 10.917969 14.371094 11.039062 14.0625 11.09375 C 13.382812 11.21875 13.113281 11.394531 13.003906 11.769531 C 12.773438 12.535156 13.519531 13.078125 14.523438 12.882812 C 15.417969 12.707031 15.949219 12 15.886719 11.039062 L 15.867188 10.6875 Z M 15.246094 10.835938 "/> <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 24.773438 10.765625 C 24.636719 10.816406 24.140625 10.925781 23.671875 11.007812 C 23.203125 11.09375 22.734375 11.199219 22.632812 11.253906 C 22.121094 11.519531 22 12.132812 22.378906 12.5625 C 22.914062 13.183594 24.320312 12.960938 24.828125 12.171875 C 24.984375 11.9375 25.019531 11.804688 25.042969 11.273438 C 25.0625 10.933594 25.0625 10.660156 25.046875 10.660156 C 25.035156 10.667969 24.910156 10.710938 24.773438 10.765625 Z M 24.773438 10.765625 "/> <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 30.5625 5.6875 C 30.5625 5.722656 31.1875 7.519531 31.953125 9.695312 L 33.34375 13.648438 L 34.183594 13.648438 C 34.917969 13.648438 35.027344 13.636719 35.070312 13.523438 C 35.089844 13.460938 35.71875 11.714844 36.445312 9.644531 C 37.183594 7.578125 37.804688 5.828125 37.824219 5.757812 C 37.871094 5.648438 37.804688 5.640625 37.019531 5.640625 L 36.164062 5.640625 L 35.214844 8.578125 C 34.339844 11.265625 34.25 11.511719 34.183594 11.335938 C 34.132812 11.234375 33.6875 9.910156 33.175781 8.390625 L 32.25 5.640625 L 31.410156 5.640625 C 30.941406 5.640625 30.5625 5.660156 30.5625 5.6875 Z M 30.5625 5.6875 "/> <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 38.476562 6.335938 L 38.476562 7.035156 L 39.992188 7.035156 L 39.992188 5.640625 L 38.476562 5.640625 Z M 38.476562 6.335938 "/> <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 43.34375 7.804688 C 41.878906 8.15625 40.96875 9.632812 41.21875 11.261719 C 41.4375 12.660156 42.257812 13.488281 43.648438 13.710938 C 45.671875 14.046875 47.351562 12.3125 47.035156 10.230469 C 46.847656 9.019531 45.992188 8.0625 44.863281 7.800781 C 44.507812 7.714844 43.703125 7.722656 43.34375 7.804688 Z M 44.863281 9.207031 C 45.25 9.464844 45.457031 9.921875 45.484375 10.585938 C 45.5 10.878906 45.476562 11.238281 45.4375 11.394531 C 45.070312 12.773438 43.433594 12.910156 42.882812 11.617188 C 42.75 11.308594 42.730469 11.164062 42.757812 10.613281 C 42.78125 10.046875 42.808594 9.929688 42.984375 9.636719 C 43.390625 8.976562 44.230469 8.789062 44.863281 9.207031 Z M 44.863281 9.207031 "/> <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 38.476562 10.757812 L 38.476562 13.648438 L 39.992188 13.648438 L 39.992188 7.867188 L 38.476562 7.867188 Z M 38.476562 10.757812 "/> </g> </svg> <div class="sc-bkzYnD kwkEfR">Listing Health Score :</div><span type="pink" class="sc-idOiZg ${color}">${map.totalScore}</span></div></div>`

listingMainDiv.appendChild(subDiv);

const seeBtn = document.createElement('div')
seeBtn.setAttribute('class', 'jpPImZ')
seeBtn.innerHTML='<button class="sc-dWddBi hZeEru"><div class="sc-hzMMVR jteAob"><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="chevron-up" class="svg-inline--fa fa-chevron-up sc-iEbUNj iTBTao" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M15.41 302.7l191.1-183.1C212 114.2 218 111.1 224 111.1s11.97 2.219 16.59 6.688l191.1 183.1c9.594 9.152 9.906 24.34 .7187 33.9c-9.125 9.625-24.38 9.938-33.91 .7187L224 169.2l-175.4 168c-9.5 9.219-24.78 8.906-33.91-.7187C5.502 327 5.814 311.8 15.41 302.7z"></path></svg></div>View More</button>'

listingMainDiv.appendChild(seeBtn);



const modal = document.createElement('div');
  modal.setAttribute('id', 'listing-modal');
  modal.setAttribute('class', 'listmodal');

  
let bool = false
  listingMainDiv.onclick = function (){
    bool=!bool
    if(bool===true)
    listingMainDiv.appendChild(modal)
    else
    listingMainDiv.removeChild(modal)
  }

  const modalHeader = document.createElement('div');
  modalHeader.setAttribute('class', 'modal-header');
  modalHeader.innerText = 'Listing Health Score';

    modal.appendChild(modalHeader);

const rightSvg ='<div class="sc-BcYfy dFvqTy"><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="check" class="svg-inline--fa fa-check sc-ddSnZj wVwJC" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M440.1 103C450.3 112.4 450.3 127.6 440.1 136.1L176.1 400.1C167.6 410.3 152.4 410.3 143 400.1L7.029 264.1C-2.343 255.6-2.343 240.4 7.029 231C16.4 221.7 31.6 221.7 40.97 231L160 350.1L407 103C416.4 93.66 431.6 93.66 440.1 103V103z"></path></svg></div>'
const wrongSvg ='<div class="sc-BcYfy jYRAbk"><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="xmark" class="svg-inline--fa fa-xmark sc-ivIGLq kfILgk" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M312.1 375c9.369 9.369 9.369 24.57 0 33.94s-24.57 9.369-33.94 0L160 289.9l-119 119c-9.369 9.369-24.57 9.369-33.94 0s-9.369-24.57 0-33.94L126.1 256L7.027 136.1c-9.369-9.369-9.369-24.57 0-33.94s24.57-9.369 33.94 0L160 222.1l119-119c9.369-9.369 24.57-9.369 33.94 0s9.369 24.57 0 33.94L193.9 256L312.1 375z"></path></svg></div>'




let imgNum =rightSvg;
let whiteBack=rightSvg;
let size=rightSvg;
let character=rightSvg;
let bullet=rightSvg;
let description=rightSvg;
let productdescription=rightSvg;
let rating=rightSvg;
let reviews=rightSvg;
let specificationOrProductDetailSVG = rightSvg;
let specificationOrProductDetail = "Product Details"

if(map[0]<5)
imgNum=wrongSvg
if(map[1]===false)
whiteBack=wrongSvg
if(map[2]<150)
character=wrongSvg
if(map[3]<0.8)
bullet=wrongSvg
if(map[4].ratings<4)
rating =wrongSvg
if(map[4].reviewCount<10)
reviews= wrongSvg
if(map[5]< 500)
size =wrongSvg
if(map[6].description===0)
description=wrongSvg
if(map[6].productDescription===0)
productdescription=wrongSvg

if(map[6].specification > 0){
  specificationOrProductDetail ="Specifications"
}

if(map[6].productDetail + map[6].specification < 5){
  specificationOrProductDetailSVG =wrongSvg;
}




  const contentTop = document.createElement('div');
  contentTop.setAttribute('class', 'lefeKT');
  contentTop.innerHTML=`<div class="sc-kJjKpj dDlBoq"><div class="sc-gVplKw cRTcpJ"><div class="sc-bDySYp hYESpG">Product Images</div><div class="sc-jhlqpQ fQSxhv"><div class="sc-cZHnPT bZwWXg"><div class="sc-cKQJNu kuwbCK"><span class="sc-bMzxSZ fVzDaX">5 or more images</span><div class="sc-bxITQA dXVDfe">Current: ${map[0]}</div></div><div class="sc-PTChX bVZnJl">
  ${imgNum}</div></div></div><div class="sc-jhlqpQ fQSxhv"><div class="sc-cZHnPT bZwWXg"><div class="sc-cKQJNu kuwbCK"><span class="sc-bMzxSZ fVzDaX">White Main Image Background</span><div class="sc-bxITQA dXVDfe"></div></div><div class="sc-PTChX bVZnJl">
  ${whiteBack}</div></div></div><div class="sc-jhlqpQ fQSxhv"><div class="sc-cZHnPT bZwWXg"><div class="sc-cKQJNu kuwbCK"><span class="sc-bMzxSZ fVzDaX">Shorter Side is More than 500 px</span><div class="sc-bxITQA dXVDfe">Current: ${map[5]}</div></div><div class="sc-PTChX bVZnJl">
  ${size}</div></div></div></div><div class="sc-gVplKw cRTcpJ"><div class="sc-bDySYp hYESpG">Listing Text</div><div class="sc-jhlqpQ fQSxhv"><div class="sc-cZHnPT bZwWXg"><div class="sc-cKQJNu kuwbCK"><span class="sc-bMzxSZ fVzDaX">Title Exceeds 150 Characters</span><div class="sc-bxITQA dXVDfe">Current: ${map[2]}</div></div><div class="sc-PTChX bVZnJl">
  ${character}</div></div></div><div class="sc-jhlqpQ fQSxhv"><div class="sc-cZHnPT bZwWXg"><div class="sc-cKQJNu kuwbCK"><span class="sc-bMzxSZ fVzDaX">Keyword Density in Title more than 0.8</span><div class="sc-bxITQA dXVDfe">Current: ${map[3]}</div></div><div class="sc-PTChX bVZnJl">
  ${bullet}</div></div></div><div class="sc-jhlqpQ fQSxhv"><div class="sc-cZHnPT bZwWXg"><div class="sc-cKQJNu kuwbCK"><span class="sc-bMzxSZ fVzDaX">Description</span><div class="sc-bxITQA dXVDfe">Features Enhanced Brand Content</div></div><div class="sc-PTChX bVZnJl">
  ${description}</div></div></div><div class="sc-jhlqpQ fQSxhv"><div class="sc-cZHnPT bZwWXg"><div class="sc-cKQJNu kuwbCK"><span class="sc-bMzxSZ fVzDaX">Product Description</span><div class="sc-bxITQA dXVDfe"></div></div><div class="sc-PTChX bVZnJl">
  ${productdescription}</div></div></div><div class="sc-jhlqpQ fQSxhv"><div class="sc-cZHnPT bZwWXg"><div class="sc-cKQJNu kuwbCK"><span class="sc-bMzxSZ fVzDaX">5 or more ${specificationOrProductDetail}</span><div class="sc-bxITQA dXVDfe">Current: ${map[6].productDetail + map[6].specification}</div></div><div class="sc-PTChX bVZnJl">
  ${specificationOrProductDetailSVG}</div></div></div></div><div class="sc-gVplKw cRTcpJ"><div class="sc-bDySYp hYESpG">Reviews &amp; Rating</div><div class="sc-jhlqpQ fQSxhv"><div class="sc-cZHnPT bZwWXg"><div class="sc-cKQJNu kuwbCK"><span class="sc-bMzxSZ fVzDaX">Rating is 4.0 or above</span><div class="sc-bxITQA dXVDfe">Current: ${map[4].ratings}</div></div><div class="sc-PTChX bVZnJl">
  ${rating}</div></div></div><div class="sc-jhlqpQ fQSxhv"><div class="sc-cZHnPT bZwWXg"><div class="sc-cKQJNu kuwbCK"><span class="sc-bMzxSZ fVzDaX">10 or more reviews</span><div class="sc-bxITQA dXVDfe">Current: ${map[4].reviewCount}</div></div><div class="sc-PTChX bVZnJl">
  ${reviews}</div></div></div></div></div>`

    modal.appendChild(contentTop)

  return listingMainDiv;
}
export default ListingModal;
