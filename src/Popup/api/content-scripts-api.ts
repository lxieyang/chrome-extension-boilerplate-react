import {
    ContentScriptResponse,
    GetCurrentPlayingSongResponse,
    GetCurrentViewSongsResponse,
    MessageAction,
    StreamingServiceSong,
} from "../../shared/shared.model";
import { sendMessageToTab } from "./browser-api";

export function getCurrentPlayingSongFromTab(tabId: number): Promise<StreamingServiceSong | undefined> {
    return sendMessageToTab<ContentScriptResponse<GetCurrentPlayingSongResponse>>(tabId, MessageAction.GetCurrentPlayingSong).then(
        (response) => response.data
    );
}

export function getCurrentViewSongsFromTab(tabId: number): Promise<StreamingServiceSong[] | undefined> {
    return sendMessageToTab<ContentScriptResponse<GetCurrentViewSongsResponse>>(tabId, MessageAction.GetCurrentViewSongs).then(
        (response) => response.data
    );
}
