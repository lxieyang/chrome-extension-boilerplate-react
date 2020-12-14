import { MusicStreamingServiceConfig } from "../music-streaming-api.model";

const sharedTableSelectors = {
    songsTable: `[role="grid"]`,
    songRowDomElements: `[data-testid="tracklist-row"]`,
    titleDomElement: `[role="gridcell"]:nth-child(2) > div > div`,
    artistDomElement: `[role="gridcell"]:nth-child(2) > div > span`,
};

export const spotifyConfig: MusicStreamingServiceConfig = {
    urlMatch: "open.spotify.com/",
    currentPlayingSong: {
        selectors: {
            containerDomElement: `.now-playing`,
            titleDomElement: `.now-playing div:nth-child(2) > div:nth-child(1)`,
            artistsDomElement: `.now-playing > div:nth-child(2) > div:nth-child(2)`,
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
        ],
    },
};
