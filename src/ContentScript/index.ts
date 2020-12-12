import { MessageAction } from "../shared/shared.model";
import { createDomApi } from "./music-streaming-api/create-dom-api";
import { MusicStreamingApi } from "./music-streaming-api/music-streaming-api";

const messageActionToHandler: { [key in keyof typeof MessageAction]: (request: any, sender: chrome.runtime.MessageSender) => void } = {
    [MessageAction.GetCurrentPlayingSong]: getCurrentPlayingSong,
    [MessageAction.GetCurrentViewSongs]: getCurrentViewSongs,
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log({ request, sender });

    if (request.action in messageActionToHandler) {
        const messageActionKey = MessageAction[request.action as MessageAction];
        sendResponse(messageActionToHandler[messageActionKey](request, sender));
    }
});

let musicStreamingApi: MusicStreamingApi;

function getCurrentPlayingSong() {
    if (!musicStreamingApi) {
        const domApi = createDomApi();
        musicStreamingApi = new MusicStreamingApi(domApi);
    }

    return musicStreamingApi.getCurrentPlayingSong();
}

function getCurrentViewSongs() {
    if (!musicStreamingApi) {
        const domApi = createDomApi();
        musicStreamingApi = new MusicStreamingApi(domApi);
    }

    return musicStreamingApi.getCurrentViewSongs();
}
