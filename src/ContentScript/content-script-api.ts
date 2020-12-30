import { browser, Runtime } from "webextension-polyfill-ts";
import { ContentScriptRequest, GetCurrentPlayingSongResponse, GetCurrentViewSongsResponse, MessageAction } from "../shared/shared.model";
import { createDomApi } from "./music-streaming-api/create-dom-api";
import { MusicStreamingApi as MusicStreamingService } from "./music-streaming-api/music-streaming-api";

const messageActionToHandler: {
    [key in keyof typeof MessageAction]: (request: ContentScriptRequest, sender: Runtime.MessageSender) => Promise<any>;
} = {
    [MessageAction.GetCurrentPlayingSong]: getCurrentPlayingSong,
    [MessageAction.GetCurrentViewSongs]: getCurrentViewSongs,
};

browser.runtime.onMessage.addListener((request: ContentScriptRequest, sender) => {
    console.log({ request, sender });

    const handlerFunction = messageActionToHandler[request.action];
    if (handlerFunction) {
        return handlerFunction(request, sender).then((data: any) => ({ requestId: request.requestId, data }));
    }
});

const musicStreamingApi = new MusicStreamingService(createDomApi());

function getCurrentPlayingSong(): Promise<GetCurrentPlayingSongResponse["data"]> {
    return musicStreamingApi.getCurrentPlayingSong();
}

function getCurrentViewSongs(): Promise<GetCurrentViewSongsResponse["data"]> {
    return musicStreamingApi.getCurrentViewSongs();
}
