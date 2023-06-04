import { getAuthToken, constants } from '../../Popup/utils';

const Jumper = async () => {
  const mainDiv = document.createElement('div');
  mainDiv.setAttribute('class', 'jumperdiv');

  const youtube = document.createElement('div');
  youtube.innerHTML =
    '<iframe width="280" height="180" src="https://www.youtube.com/embed/j6tLAQmlCT0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';

  mainDiv.appendChild(youtube);

  const login = document.createElement('button');
  login.setAttribute('class', 'NZXZk');
  login.innerHTML = 'Create a free account';

  let authToken = await getAuthToken();
  if (!authToken || !authToken[constants.authTokenKey]) {
    mainDiv.appendChild(login);
  }

  login.onclick = () => {
    chrome.runtime.sendMessage({ message: 'Register' });
  };

  return mainDiv;
};
export default Jumper;
