console.log('This is the background page.');
console.log('Put the background scripts here.');

let orders = [];
chrome.webRequest.onBeforeSendHeaders.addListener((details) => {
        details?.requestHeaders?.find((header) => {
            if (header.name === 'Authorization' && header.value.includes('Bearer')) {
                console.log('token', header.value);
                orders.length === 0 && getOrders(header.value).then(e => {
                    console.log('this is the final data', e);
                }).catch(e => {
                    debugger;
                });
            }
        }
        );
    },
    { urls: ["<all_urls>"] },
    ["requestHeaders", "extraHeaders"]
);

async function getOrders(token, url='https://api.robinhood.com/orders/?page_size=200') {
    let results = await fetch(url, {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "authorization": token,
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "none"
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
    });
    let parsed = await results.json();
    orders.push(...parsed.results);
    if(parsed.next) {
        return await getOrders(token, parsed.next);
    }
    return orders;
}