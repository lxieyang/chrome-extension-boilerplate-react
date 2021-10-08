import { browser, Runtime } from "webextension-polyfill-ts";
import {
    ContentScriptEndpoint,
    ContentScriptRequest,
    ContentScriptResponse,
    GetCurrentPlayingSongResponse,
    GetCurrentViewSongsResponse,
} from "../../shared/shared.model";
import { MusicStreamingApi } from "./music-streaming-api/music-streaming-api";

export class EnpointService {
    constructor(private musicStreamingApi: MusicStreamingApi) {}

    public init() {
        this.subscribeToBrowserMessages();
    }

    private subscribeToBrowserMessages() {
        browser.runtime.onMessage.addListener((request: ContentScriptRequest, sender) => {
            console.log("SHRED content-script request", { request, sender });

            return this.handleEndpointRequest(request, sender).then((data: any) => {
                const response: ContentScriptResponse<any> = { requestId: request.requestId, data };

                console.log("SHRED content-script response", { response });

                return response;
            });
        });
    }

    private handleEndpointRequest(request: ContentScriptRequest, sender) {
        switch (request.endpoint) {
            case ContentScriptEndpoint.GetCurrentPlayingSong:
                return this.getCurrentPlayingSong();

            case ContentScriptEndpoint.GetCurrentViewSongs:
                return this.getCurrentViewSongs();
        }
    }

    private getCurrentPlayingSong(): Promise<GetCurrentPlayingSongResponse> {
        return this.musicStreamingApi.getCurrentPlayingSong();
    }

    private getCurrentViewSongs(): Promise<GetCurrentViewSongsResponse> {
        return this.musicStreamingApi.getCurrentViewSongs();
    }
}
