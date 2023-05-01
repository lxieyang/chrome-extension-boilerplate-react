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
