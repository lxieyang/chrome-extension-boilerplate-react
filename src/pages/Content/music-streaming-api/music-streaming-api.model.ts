export interface DomApi {
    getCurrentUrl(): string;
    querySelector: Document["querySelector"];
    querySelectorAll: Document["querySelectorAll"];
}

export interface MusicStreamingServiceConfig {
    urlMatch: string;
    currentPlayingSong: {
        selectors: {
            containerDomElement: string;
            titleDomElement: string;
            artistsDomElement: string;
        };
    };
    currentViewSongs: {
        views: {
            urlMatch: string;
            selectors: {
                songsTable: string;
                songRowDomElements: string;
                titleDomElement: string;
                artistDomElement: string;
            };
        }[];
    };
}
