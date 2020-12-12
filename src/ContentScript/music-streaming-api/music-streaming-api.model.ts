import { StreamingServiceSong } from "../../shared/shared.model";

export interface DomApi {
    getCurrentUrl(): string;
    querySelector: Document["querySelector"];
    querySelectorAll: Document["querySelectorAll"];
}

export interface MusicStreamingServiceApi {
    isStillMatch(): boolean;

    getCurrentPlayingSong(): StreamingServiceSong | undefined;
    getCurrentViewSongs(): StreamingServiceSong[] | undefined;
}

export type MusicStreamingServiceApiClass = {
    new (domApi: DomApi): MusicStreamingServiceApi;

    isMatch(url: string, domApi: DomApi): boolean;
};
