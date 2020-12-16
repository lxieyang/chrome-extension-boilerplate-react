import { waitForElementToDisplay } from "../../shared/dom-helpers";
import { StreamingServiceSong } from "../../shared/shared.model";
import { DomApi } from "./music-streaming-api.model";
import { spotifyConfig } from "./music-streaming-service-configs/spotify-config";
import { tidalConfig } from "./music-streaming-service-configs/tidal-config";

const musicStreamingServiceConfigs = [tidalConfig, spotifyConfig];

export class MusicStreamingApi {
    constructor(private domApi: DomApi) {}

    public async getCurrentPlayingSong(): Promise<StreamingServiceSong | undefined> {
        const musicStreamingConfig = this.getMusicStreamingConfig();
        const selectors = musicStreamingConfig?.currentPlayingSong.selectors;
        if (!selectors) {
            return;
        }

        await waitForElementToDisplay(selectors.containerDomElement);

        const containerDomElement = this.domApi.querySelector(selectors.containerDomElement);
        const titleDomElement = containerDomElement?.querySelector(selectors.titleDomElement);
        const title = titleDomElement?.textContent as string;
        const artistsDomElement = containerDomElement?.querySelectorAll(selectors.artistsDomElement);
        const artist = artistsDomElement?.[0]?.textContent as string;

        return {
            title,
            artist,
        };
    }

    public async getCurrentViewSongs(): Promise<StreamingServiceSong[] | undefined> {
        const musicStreamingConfig = this.getMusicStreamingConfig();
        const currentViewConfig = musicStreamingConfig?.currentViewSongs.views.find((view) =>
            this.domApi.getCurrentUrl().includes(view.urlMatch)
        );
        const selectors = currentViewConfig?.selectors;
        if (!selectors) {
            return;
        }

        await waitForElementToDisplay(selectors.songsTable);

        const songsTable = this.domApi.querySelector(selectors.songsTable);
        const songRowDomElements = Array.from(songsTable?.querySelectorAll(selectors.songRowDomElements) ?? []);
        if (!songRowDomElements.length) {
            return;
        }

        return songRowDomElements.map((songRowDomElement) => {
            const titleDomElement = songRowDomElement.querySelector(selectors.titleDomElement);
            const artistDomElement = songRowDomElement.querySelector(selectors.artistDomElement);

            return {
                title: titleDomElement?.textContent as string,
                artist: artistDomElement?.textContent as string,
            };
        });
    }

    private getMusicStreamingConfig() {
        return musicStreamingServiceConfigs.find((musicStreamingConfig) =>
            this.domApi.getCurrentUrl().includes(musicStreamingConfig.urlMatch)
        );
    }
}
