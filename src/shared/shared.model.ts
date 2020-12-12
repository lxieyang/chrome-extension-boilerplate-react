export interface StreamingServiceSong {
    artist?: string;
    title?: string;
}

export enum MessageAction {
    GetCurrentPlayingSong = "GetCurrentPlayingSong",
    GetCurrentViewSongs = "GetCurrentViewSongs",
}
