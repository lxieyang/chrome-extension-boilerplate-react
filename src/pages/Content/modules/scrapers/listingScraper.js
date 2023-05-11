import { getRatingsDist } from '../utils.js';
function mediaCount() {
  const media_count = document.querySelector(
    '#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-5-12._78xt5Y > div:nth-child(1) > div > div._3li7GG > div._35DpL- > div > div._2mLllQ > ul'
  ).childNodes.length;
  return media_count;
}

function isWhiteBackground() {
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
      return true;
    } else {
      return false;
    }
  };
  var imageUrl = document.querySelector('._3kidJX img').getAttribute('src');
  image.crossOrigin = 'Anonymous';
  image.src = imageUrl;
}

const titleCharacterCount = () => {
  const text = document.querySelector('.B_NuCI').textContent;
  const characterCount = text.length;
  return characterCount;
};

const currentRatingsAndReviewCount = async () => {
  const ratingDist = await getRatingsDist();
  const ratings = ratingDist.average;
  const reviewCount = ratingDist.count;
  return { ratings, reviewCount };
};
