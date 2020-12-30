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
            containerDomElement: `.now-playing`,
            titleDomElement: `.now-playing .ellipsis-one-line a[href^="/album/"]`,
            artistsDomElement: `.now-playing .ellipsis-one-line a[href^="/artist/"]`,
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
