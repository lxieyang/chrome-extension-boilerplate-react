import {
    ContentScriptResponse,
    GetCurrentPlayingSongResponse,
    GetCurrentViewSongsResponse,
    MessageAction,
    StreamingServiceSong,
} from "../../shared/shared.model";
import { sendMessageToTab } from "./browser-api";

export function getCurrentPlayingSongFromTab(tabId: number): Promise<StreamingServiceSong | undefined> {
    return sendMessageToTab<GetCurrentPlayingSongResponse>(tabId, MessageAction.GetCurrentPlayingSong).then((response) => response.data);
}

export function getCurrentViewSongsFromTab(tabId: number): Promise<StreamingServiceSong[] | undefined> {
    return sendMessageToTab<GetCurrentViewSongsResponse>(tabId, MessageAction.GetCurrentViewSongs).then((response) => response.data);
}
