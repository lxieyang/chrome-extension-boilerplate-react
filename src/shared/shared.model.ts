export interface StreamingServiceSong {
    artist?: string;
    title?: string;
}

export enum MessageAction {
    GetCurrentPlayingSong = "GetCurrentPlayingSong",
    GetCurrentViewSongs = "GetCurrentViewSongs",
}

interface ContentScriptResponse {
    data: any;
    requestId?: number;
}

export interface GetCurrentPlayingSongResponse extends ContentScriptResponse {
    data: StreamingServiceSong | undefined;
}

export interface GetCurrentViewSongsResponse extends ContentScriptResponse {
    data: StreamingServiceSong[] | undefined;
}
