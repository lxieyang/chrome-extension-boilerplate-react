import { getRatingsDist } from '../utils.js';
import { stopWords } from '../constants.js';
async function mediaCount() {
  const media_count = document.querySelector(
    '#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-5-12._78xt5Y > div:nth-child(1) > div > div._3li7GG > div._35DpL- > div > div._2mLllQ > ul'
  ).childNodes.length;
  return media_count;
}

function isWhiteBackground() {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = function () {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);

      // Access the pixel data
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      // console.log(pixels);
      // Analyze the pixel values
      let whitePixelCount = 0;
      for (let i = 0; i < pixels.length; i += 4) {
        const red = pixels[i];
        const green = pixels[i + 1];
        const blue = pixels[i + 2];

        // Check if the pixel is white
        if (
          red >= 253 &&
          red <= 255 &&
          green >= 253 &&
          green <= 255 &&
          blue >= 253 &&
          blue <= 255
        ) {
          whitePixelCount++;
        }
      }

      // Calculate the percentage of white pixels
      const imageArea = canvas.width * canvas.height;
      const whitePixelPercentage = (whitePixelCount / imageArea) * 100;

      // Determine if the background is predominantly white
      if (whitePixelPercentage > 30) {
        resolve(true);
      } else {
        resolve(false);
      }
    };
    var imageUrl = document.querySelector('._3kidJX img').getAttribute('src');
    image.crossOrigin = 'Anonymous';
    image.src = imageUrl;
  });
}

const titleCharacterCount = async () => {
  const text = document.querySelector('.B_NuCI').textContent;
  const characterCount = text.length;
  return characterCount;
};

const keyWordsDensity = async () => {
  const text = document.querySelector('.B_NuCI').textContent;
  const words = text.split(' ');
  const wordCount = words.length;
  const wordCountWithoutStopWords = words.filter(
    (word) => !stopWords.includes(word)
  ).length;
  const density = wordCountWithoutStopWords / wordCount;
  // round to 2 decimal places
  return Math.round(density * 100) / 100;
};

const currentRatingsAndReviewCount = async () => {
  const ratingDist = await getRatingsDist();
  const ratings = ratingDist.average;
  const reviewCount = ratingDist.reviewCount;
  return { ratings, reviewCount };
};

const imagePixelSize = async () => {
  const imageElement = document.querySelector('._3kidJX img');
  const img = new Image();
  let src = imageElement.getAttribute('src');
  let srcset = imageElement.getAttribute('srcset');
  if (srcset) {
    const sources = srcset.split(',');
    src = sources[0].trim().split(' ')[0];
  }
  img.src = src;
  return new Promise((resolve, reject) => {
    img.onload = function () {
      const actualWidth = img.naturalWidth;
      const actualHeight = img.naturalHeight;
      const shorterSidePixelCount = Math.min(actualWidth, actualHeight);
      resolve(shorterSidePixelCount);
    };
  });
};

const descriptionAndProductDescription = async () => {
  const toReturn = {
    description: 0,
    productDescription: 0,
  };
  const divSelect = document.querySelector(
    '#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-8-12 > div._1YokD2._3Mn1Gg'
  ).childNodes;
  for (let i = 0; i < divSelect.length; i++) {
    const splitText = divSelect[i].innerText.split('\n');
    if (splitText[0] === 'Description') {
      toReturn.description = 1;
    } else if (splitText[0] === 'Product Description') {
      toReturn.productDescription = 1;
      break;
    }
  }

  return toReturn;
};

const calculateNetScore = (results) => {
  let totalScore = 0;

  //media count
  if (results[0] >= 8) {
    totalScore += 1;
  } else if (results[0] >= 5) {
    totalScore += 0.8;
  } else if (results[0] >= 2) {
    totalScore += 0.5;
  } else if (results[0] >= 1) {
    totalScore += 0.2;
  }

  //white background
  if (results[1]) {
    totalScore += 1;
  }

  // imagePixelSize
  if (results[5] >= 500) {
    totalScore += 1;
  }

  //title character count
  if (results[2] >= 150) {
    totalScore += 1;
  } else if (results[2] >= 100) {
    totalScore += 0.8;
  } else if (results[2] >= 50) {
    totalScore += 0.5;
  } else {
    totalScore += 0.2;
  }

  //keyWordsDensity
  if (results[3] >= 0.8) {
    totalScore += 1;
  } else if (results[3] >= 0.6) {
    totalScore += 0.8;
  } else if (results[3] >= 0.4) {
    totalScore += 0.5;
  } else if (results[3] >= 0.2) {
    totalScore += 0.2;
  }

  // descriptionAndProductDescription
  if (results[6].description) {
    totalScore += 1;
  }
  if (results[6].productDescription) {
    totalScore += 2;
  }

  //currentRatingsAndReviewCount
  if (results[4].ratings >= 4.5) {
    totalScore += 1;
  } else if (results[4].ratings >= 4) {
    totalScore += 0.9;
  } else if (results[4].ratings >= 3) {
    totalScore += 0.7;
  } else if (results[4].ratings >= 2) {
    totalScore += 0.5;
  } else if (results[4].ratings >= 1) {
    totalScore += 0.2;
  }

  if (results[4].reviewCount >= 50) {
    totalScore += 1;
  } else if (results[4].reviewCount >= 20) {
    totalScore += 0.8;
  } else if (results[4].reviewCount >= 10) {
    totalScore += 0.5;
  } else if (results[4].reviewCount >= 1) {
    totalScore += 0.2;
  }

  return totalScore.toFixed(2);
};
const getListingData = async () => {
  // run these tasks in parallel
  try {
    const results = await Promise.all([
      mediaCount(),
      isWhiteBackground(),
      titleCharacterCount(),
      keyWordsDensity(),
      currentRatingsAndReviewCount(),
      imagePixelSize(),
      descriptionAndProductDescription(),
    ]);
    // Handle the results of all functions here

    results['totalScore'] = calculateNetScore(results);
    console.log(results);
    return results;
  } catch (err) {
    console.log('Error in getListingData');
    console.log(err);
  }
};

export default getListingData;
