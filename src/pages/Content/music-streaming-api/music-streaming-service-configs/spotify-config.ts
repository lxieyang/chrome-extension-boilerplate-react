import { MusicStreamingServiceConfig } from "../music-streaming-api.model";

const sharedTableSelectors = {
    songsTable: `[role="grid"]`,
    songRowDomElements: `[data-testid="tracklist-row"]`,
    titleDomElement: `[role="gridcell"]:nth-child(2) > div > div`,
    artistDomElement: `[role="gridcell"]:nth-child(2) a[href^="/artist/"]`,
};

export const spotifyConfig: MusicStreamingServiceConfig = {
    urlMatch: "open.spotify.com/",
    currentPlayingSong: {
        selectors: {
            containerDomElement: `[data-testid="now-playing-widget"]`,
            titleDomElement: `[data-testid="context-item-info-title"]`,
            artistsDomElement: `[data-testid="context-item-info-subtitles"]`,
        },
    },
    currentViewSongs: {
        views: [
            {
                urlMatch: "/playlist/",
                selectors: {
                    ...sharedTableSelectors,
                },
            },
            {
                urlMatch: "/album/",
                selectors: {
                    ...sharedTableSelectors,
                },
            },
            {
                urlMatch: "/artist/",
                selectors: {
                    ...sharedTableSelectors,
                },
            },
        ],
    },
};
