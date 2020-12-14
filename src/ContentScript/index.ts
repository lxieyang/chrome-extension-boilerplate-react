import { browser, Runtime } from "webextension-polyfill-ts";
import { GetCurrentPlayingSongResponse, GetCurrentViewSongsResponse, MessageAction } from "../shared/shared.model";
import { createDomApi } from "./music-streaming-api/create-dom-api";
import { MusicStreamingApi } from "./music-streaming-api/music-streaming-api";

const messageActionToHandler: {
    [key in keyof typeof MessageAction]: (request: any, sender: Runtime.MessageSender) => Promise<any>;
} = {
    [MessageAction.GetCurrentPlayingSong]: getCurrentPlayingSong,
    [MessageAction.GetCurrentViewSongs]: getCurrentViewSongs,
};

browser.runtime.onMessage.addListener((request, sender) => {
    console.log({ request, sender });

    const messageActionKey = MessageAction[request.action as MessageAction];
    const handlerFunction = messageActionToHandler[messageActionKey];
    if (handlerFunction) {
        return handlerFunction(request, sender).then((data: any) => ({ requestId: request.id, data }));
    }
});

const musicStreamingApi = new MusicStreamingApi(createDomApi());

function getCurrentPlayingSong(): Promise<GetCurrentPlayingSongResponse["data"]> {
    return musicStreamingApi.getCurrentPlayingSong();
}

function getCurrentViewSongs(): Promise<GetCurrentViewSongsResponse["data"]> {
    return musicStreamingApi.getCurrentViewSongs();
}
