import {getMessage} from "@extend-chrome/messages";

export const [sendData, dataStream, waitForData] = getMessage('Data');

export const [sendContentData, contentDataStream, waitForContentData] = getMessage('Content')
export const PAYLOAD_MSG = 'payload';
export const CONTENT_LOADED = 'content_loaded';

export async function sendMessage(greeting, data) {
    const response = await chrome.runtime.sendMessage({greeting: greeting, data: data});
    // do something with response here, not outside the function
    console.log(response);
    return response;
}