import { GetCurrentPlayingSongResponse, GetCurrentViewSongsResponse, MessageAction, StreamingServiceSong } from "../../shared/shared.model";

export function getCurrentPlayingSongFromTab(tab: chrome.tabs.Tab): Promise<StreamingServiceSong | undefined> {
    return new Promise((resolve) => {
        chrome.tabs.sendMessage(tab.id!, { action: MessageAction.GetCurrentPlayingSong }, (response: GetCurrentPlayingSongResponse) => {
            resolve(response.data);
        });
    });
}

export function getCurrentViewSongsFromTab(tab: chrome.tabs.Tab): Promise<StreamingServiceSong[] | undefined> {
    return new Promise((resolve) => {
        chrome.tabs.sendMessage(tab.id!, { action: MessageAction.GetCurrentViewSongs }, (response: GetCurrentViewSongsResponse) => {
            resolve(response.data);
        });
    });
}
