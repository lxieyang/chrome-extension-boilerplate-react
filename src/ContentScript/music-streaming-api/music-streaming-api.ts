import { StreamingServiceSong } from "../../shared/shared.model";
import { DomApi, MusicStreamingServiceApi, MusicStreamingServiceApiClass } from "./music-streaming-api.model";
import { TidalApi } from "./music-streaming-services/tidal-api";

const musicStreamingApiClasses: MusicStreamingServiceApiClass[] = [TidalApi];

export class MusicStreamingApi {
    private currentMusicStramingServiceApi: MusicStreamingServiceApi | undefined;

    constructor(private domApi: DomApi) {
        const currentUrl = domApi.getCurrentUrl();

        const matchedClass = musicStreamingApiClasses.find((musicStreamingApi) => musicStreamingApi.isMatch(currentUrl, this.domApi));
        if (matchedClass) {
            this.currentMusicStramingServiceApi = new matchedClass(domApi);
        }
    }

    public isValid(): boolean {
        return !!this.currentMusicStramingServiceApi?.isStillMatch();
    }

    public getCurrentPlayingSong(): StreamingServiceSong | undefined {
        return this.currentMusicStramingServiceApi?.getCurrentPlayingSong();
    }

    public getCurrentViewSongs(): StreamingServiceSong[] | undefined {
        return this.currentMusicStramingServiceApi?.getCurrentViewSongs();
    }
}
