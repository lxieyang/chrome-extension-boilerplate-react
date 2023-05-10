export async function postData(urll = "https://www.datavio.co/api/ratings-reviews", data = { "url": "/apple-ipad-9th-gen-64-gb-rom-10-2-inch-wi-fi-only-space-grey/product-reviews/itmd7d2c4840fa04?pid=TABG6VNCHTRZGN9N&lid=LSTTABG6VNCHTRZGN9NIK0OLT"}) {
console.log(data.type)  
const response = await fetch(urll, {
    method: "POST", 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data), 
  });
  return(response.json()); 
}

