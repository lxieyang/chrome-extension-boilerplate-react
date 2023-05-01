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

bodyModalPlace1.appendChild(bodyHeader);
bodyModalPlace1.appendChild(bodyBody);
bodyModalPlace.appendChild(bodyModalPlace1);

body.appendChild(bodyModalPlace);

modalClass2.appendChild(body);
header.appendChild(closeModal);
modalClass2.appendChild(header);

export default modal;
