import { browser, Runtime } from "webextension-polyfill-ts";
import {
    ContentScriptRequest,
    ContentScriptResponse,
    GetCurrentPlayingSongResponse,
    GetCurrentViewSongsResponse,
    MessageAction,
} from "../../shared/shared.model";
import { createDomApi } from "./music-streaming-api/create-dom-api";
import { MusicStreamingApi as MusicStreamingService } from "./music-streaming-api/music-streaming-api";

const messageActionToHandler: {
    [key in MessageAction]: (request: ContentScriptRequest, sender: Runtime.MessageSender) => Promise<any>;
} = {
    [MessageAction.GetCurrentPlayingSong]: getCurrentPlayingSong,
    [MessageAction.GetCurrentViewSongs]: getCurrentViewSongs,
};

browser.runtime.onMessage.addListener((request: ContentScriptRequest, sender) => {
    console.log("SHRED content-script request", { request, sender });

    const handlerFunction = messageActionToHandler[request.action];
    if (handlerFunction) {
        return handlerFunction(request, sender).then((data: any) => {
            const response: ContentScriptResponse<any> = { requestId: request.requestId, data };

            console.log("SHRED content-script response", { response });

            return response;
        });
    }
});

const musicStreamingApi = new MusicStreamingService(createDomApi());

function getCurrentPlayingSong(): Promise<GetCurrentPlayingSongResponse> {
    return musicStreamingApi.getCurrentPlayingSong();
}

function getCurrentViewSongs(): Promise<GetCurrentViewSongsResponse> {
    return musicStreamingApi.getCurrentViewSongs();
}
