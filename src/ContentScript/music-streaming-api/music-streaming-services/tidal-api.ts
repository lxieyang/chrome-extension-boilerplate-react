import { StreamingServiceSong } from "../../../shared/shared.model";
import { DomApi, MusicStreamingServiceApi } from "../music-streaming-api.model";

export class TidalApi implements MusicStreamingServiceApi {
    protected selectors = {
        currentPlayingSong: {
            containerDomElement: `[data-test="left-column-footer-player"]`,
            titleDomElement: `[data-test="footer-track-title"] a`,
            artistsDomElement: `[class^="mediaArtists"] a`,
        },
        currentViewSongs: {
            songsTable: `
                [data-track--source-type="playlist"] [data-type="media-table"],
                [data-track--source-type="album"] [data-type="media-table"]
            `,
            songRowDomElements: `[data-test="tracklist-row"]`,
            titleDomElement: `[data-test="table-row-title"]`,
            artistDomElement: `[data-test="track-row-artist"]`,
        },
    };

    constructor(private domApi: DomApi) {}

    public static isMatch(url: string, domApi: DomApi): boolean {
        return !!url.includes("listen.tidal.com");
    }

    public isStillMatch(): boolean {
        return TidalApi.isMatch(this.domApi.getCurrentUrl(), this.domApi);
    }

    public getCurrentPlayingSong(): StreamingServiceSong | undefined {
        const containerDomElement = this.domApi.querySelector(this.selectors.currentPlayingSong.containerDomElement);
        const titleDomElement = containerDomElement?.querySelector(this.selectors.currentPlayingSong.titleDomElement);
        const title = titleDomElement?.textContent;
        if (!title) {
            return undefined;
        }

        const artistsDomElement = containerDomElement?.querySelectorAll(this.selectors.currentPlayingSong.artistsDomElement);
        const artist = artistsDomElement?.[0]?.textContent as string;

        return {
            title,
            artist,
        };
    }

    public getCurrentViewSongs(): StreamingServiceSong[] | undefined {
        const songsTable = this.domApi.querySelector(this.selectors.currentViewSongs.songsTable);
        const songRowDomElements = Array.from(songsTable?.querySelectorAll(this.selectors.currentViewSongs.songRowDomElements) ?? []);
        if (!songRowDomElements.length) {
            return undefined;
        }

        return songRowDomElements.map((songRowDomElement) => {
            const titleDomElement = songRowDomElement.querySelector(this.selectors.currentViewSongs.titleDomElement);
            const artistDomElement = songRowDomElement.querySelector(this.selectors.currentViewSongs.artistDomElement);

            return {
                title: titleDomElement?.textContent as string,
                artist: artistDomElement?.textContent as string,
            };
        });
    }
}
