export interface StreamingServiceSong {
    artist?: string;
    title: string;
}

export enum ContentScriptEndpoint {
    GetCurrentPlayingSong = "GetCurrentPlayingSong",
    GetCurrentViewSongs = "GetCurrentViewSongs",
}

export enum ContentScriptEvents {
    CurrentPlayingSongChanged = "CurrentPlayingSongChanged",
}

export interface ContentScriptRequest {
    endpoint: ContentScriptEndpoint;
    data?: any;
    requestId?: number;
}

export interface ContentScriptResponse<T> {
    data: T;
    requestId?: number;
}

export type GetCurrentPlayingSongResponse = StreamingServiceSong | undefined;

export type GetCurrentViewSongsResponse = StreamingServiceSong[] | undefined;
