import { commaSeparatedStringToNumber } from '../utils';

const scrapePCData = () => {
  let price = document.getElementsByClassName('_16Jk6d')[0].innerText;
  // price is price except the first character
  price = commaSeparatedStringToNumber(price.substring(1));

  return { price };
};

export default scrapePCData;
