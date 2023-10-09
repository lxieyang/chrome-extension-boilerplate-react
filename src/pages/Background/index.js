import {CONTENT_LOADED, dataStream, PAYLOAD_MSG, sendContentData, sendData} from "../../util/messages";
import {messages} from '@extend-chrome/messages'

console.log('This is the background page.');
console.log('Put the background scripts here.');

// dataStream.subscribe((e) => {
//         debugger;
//         sendData({msg: 'PAYLOAD_MSG', data: orders});
//         console.log('message has been sent');
// });




let orders = [];

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        debugger;
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");

        if (request.greeting === CONTENT_LOADED){
            debugger;
            return sendResponse(orders);
        }
        debugger;
        sendResponse({farewell: "goodbye"});
    }
);
chrome.webRequest.onBeforeSendHeaders.addListener((details) => {
        details?.requestHeaders?.find((header) => {
                if (header.name === 'Authorization' && header.value.includes('Bearer')) {
                    orders.length === 0 && getOrders(header.value).then(e => {
                        console.log('this is the final data', e);
                        orders = e;
                    }).catch(e => {
                        debugger;
                    });
                }
            }
        );
    },
    {urls: ["<all_urls>"]},
    ["requestHeaders", "extraHeaders"]
);

async function getOrders(token, url = 'https://api.robinhood.com/orders/?page_size=200') {
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
    if (parsed.next) {
        return await getOrders(token, parsed.next);
    }
    return orders;
}