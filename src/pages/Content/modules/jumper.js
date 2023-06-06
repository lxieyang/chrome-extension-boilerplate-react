import { getAuthToken, constants } from '../../Popup/utils';

const Jumper = async () => {
  const mainDiv = document.createElement('div');
  mainDiv.setAttribute('class', 'jumperdiv');
  mainDiv.innerHTML='How to use Datavio Extension?'

  const youtube = document.createElement('div');
  youtube.innerHTML =
    '<iframe width="280" height="180" src="https://www.youtube.com/embed/j6tLAQmlCT0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';

  mainDiv.appendChild(youtube);

  const login = document.createElement('button');
  login.setAttribute('class', 'NZXZk');
  login.innerHTML = 'Create a free account for unlimited use';

  let authToken = await getAuthToken();
  if (!authToken || !authToken[constants.authTokenKey]) {
    mainDiv.appendChild(login);
  }

  login.onclick = () => {
    chrome.runtime.sendMessage({ message: 'Register', key: 'Jumper', track: false });
  };

  return mainDiv;
};
export default Jumper;
