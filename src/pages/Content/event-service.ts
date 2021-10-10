import { browser } from "webextension-polyfill-ts";
import { ContentScriptEvents } from "../../shared/shared.model";
import { MusicStreamingApi } from "./music-streaming-api/music-streaming-api";

export class EventService {
    constructor(private musicStreamingApi: MusicStreamingApi) {}

    public init() {
        this.subscribeToCurrentPlayingSongChanges();
    }

    private async subscribeToCurrentPlayingSongChanges() {
        try {
            const currentPlayingSongTitleContainerElement = await this.musicStreamingApi.getCurrentPlayingSongTitleContainerElement();
            if (!currentPlayingSongTitleContainerElement) {
                return;
            }

            const resizeObserver = new ResizeObserver((entries) => {
                this.sendEvent(ContentScriptEvents.CurrentPlayingSongChanged);
            });
            resizeObserver.observe(currentPlayingSongTitleContainerElement);
        } catch (error) {
            console.info("SHRED content-script error", error);
        }
    }

    private sendEvent(event: ContentScriptEvents) {
        console.log("SHRED content-script event", { event });

        browser.runtime.sendMessage({ event }).catch((error) => console.info("SHRED content-script EventService.sendEvent error", error));
    }
}
