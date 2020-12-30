import { MusicStreamingServiceConfig } from "../music-streaming-api.model";

const sharedTableSelectors = {
    songRowDomElements: `[data-test="tracklist-row"]`,
    titleDomElement: `[data-test="table-row-title"] [data-test="table-cell-title"]`,
    artistDomElement: `[data-test="track-row-artist"]`,
};

export const tidalConfig: MusicStreamingServiceConfig = {
    urlMatch: "listen.tidal.com/",
    currentPlayingSong: {
        selectors: {
            containerDomElement: `[data-test="left-column-footer-player"]`,
            titleDomElement: `[data-test="footer-track-title"] a`,
            artistsDomElement: `[class^="mediaArtists"] a`,
        },
    },
    currentViewSongs: {
        views: [
            {
                urlMatch: "/playlist/",
                selectors: {
                    ...sharedTableSelectors,
                    songsTable: `[data-track--source-type="playlist"][data-type="media-table"] [role="rowgroup"]`,
                },
            },
            {
                urlMatch: "/album/",
                selectors: {
                    ...sharedTableSelectors,
                    songsTable: `[data-track--source-type="album"][data-type="media-table"] [role="rowgroup"]`,
                },
            },
        ],
    },
};
