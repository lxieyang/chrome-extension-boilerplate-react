export interface StreamingServiceSong {
    artist?: string;
    title: string;
}

export enum MessageAction {
    GetCurrentPlayingSong = "GetCurrentPlayingSong",
    GetCurrentViewSongs = "GetCurrentViewSongs",
}

export interface ContentScriptRequest {
    action: MessageAction;
    data?: any;
    requestId?: number;
}

export interface ContentScriptResponse<T = any> {
    data: T;
    requestId?: number;
}

export type GetCurrentPlayingSongResponse = StreamingServiceSong | undefined;

export type GetCurrentViewSongsResponse = StreamingServiceSong[] | undefined;
