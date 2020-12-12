import { StreamingServiceSong } from "../../../shared/shared.model";
import { DomApi, MusicStreamingServiceApi } from "../music-streaming-api.model";

export class SpotifyApi implements MusicStreamingServiceApi {
    protected selectors = {
        currentPlayingSong: {
            containerDomElement: `.now-playing`,
            titleDomElement: `.now-playing div:nth-child(2) > div:nth-child(1)`,
            artistsDomElement: `.now-playing > div:nth-child(2) > div:nth-child(2)`,
        },
        currentViewSongs: {
            songsTable: `[role="grid"]`,
            songRowDomElements: `[data-testid="tracklist-row"]`,
            titleDomElement: `[role="gridcell"]:nth-child(2) > div > div`,
            artistDomElement: `[role="gridcell"]:nth-child(2) > div > span`,
        },
    };

    constructor(private domApi: DomApi) {}

    public static isMatch(url: string, domApi: DomApi): boolean {
        return !!url.includes("https://open.spotify.com/");
    }

    public isStillMatch(): boolean {
        return SpotifyApi.isMatch(this.domApi.getCurrentUrl(), this.domApi);
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
