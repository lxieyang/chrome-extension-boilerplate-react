import { commaSeparatedStringToNumber } from '../utils';
import { commissionCategory } from '../constants';
const scrapePCData = () => {
  const toReturn = {};
  let price = document.getElementsByClassName('_16Jk6d')[0].innerText;
  let categoryArray = document.getElementsByClassName('_2whKao');
  const topCategory = categoryArray[1] && categoryArray[1].innerText;
  // price is price except the first character
  price = commaSeparatedStringToNumber(price.substring(1));
  if (topCategory) {
    toReturn.category = topCategory;
    if (commissionCategory[topCategory]) {
      toReturn.commissionFeePercentage = commissionCategory[topCategory];
    }
  }
  toReturn.price = price;
  return toReturn;
};

export default scrapePCData;
