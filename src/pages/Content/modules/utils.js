export function commaSeparatedStringToNumber(str) {
  // Remove commas from the string
  const withoutCommas = str.replace(/,/g, '');

  // Convert the string to a number
  const number = parseFloat(withoutCommas);

  // Check if the result is a valid number
  if (isNaN(number)) {
    throw new Error('Invalid number format');
  }

  return number;
}

export function round2Decimals(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

export function urlGenerator() {
  const url = window.location.href;
  let newUrl = '';
  let bool = false;
  for (let i = 2; i < url.length; i++) {
    if (bool === true) {
      newUrl += url[i];
    }
    if (url[i - 2] === 'c' && url[i - 1] === 'o' && url[i] === 'm') {
      bool = true;
    }
    if (url[i + 1] === '/' && url[i + 2] === 'p' && url[i + 3] === '/') {
      newUrl += '/product-reviews/';
      i += 3;
    }
    if (
      url[i + 1] === '&' &&
      url[i + 2] === 'm' &&
      url[i + 3] === 'a' &&
      url[i + 4] === 'r'
    ) {
      break;
    }
  }

  return newUrl;
}

function getRatingsBreakUp(data) {
  for (let i of data.RESPONSE.slots) {
    try {
      let to_analyze_component = i.widget.data.product.value.rating;
      return to_analyze_component;
    } catch (error) {
      continue;
    }
  }
}

export async function getRatingsDist() {
  const url = `${urlGenerator()}&aid=overall&certifiedBuyer=false&sortOrder=MOST_HELPFUL`;
  const get_review_url = 'https://2.rome.api.flipkart.com/api/4/page/fetch';
  const response = await fetch(get_review_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
      'Accept-Language': 'en-US,en;q=0.9',
      Connection: 'keep-alive',
      'Content-Type': 'application/json',
      'X-User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 FKUA/website/42/website/Desktop',
    },
    body: JSON.stringify({ pageUri: url }),
  });
  if (response.status !== 200) {
    console.log('Error fetching reviews');
    throw new Error('Failed to fetch reviews');
  }
  let body = await response.json();
  const ratingBreakup = getRatingsBreakUp(body);
  return ratingBreakup;
}
