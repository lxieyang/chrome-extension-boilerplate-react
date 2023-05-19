
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
subDiv.innerHTML=`<div class="sc-fodVek eebzdb"><div class="sc-bkzYnD kwkEfR">Listing Health Score :</div><span type="pink" class="sc-idOiZg ${color}">${map.totalScore}</span></div></div>`

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
