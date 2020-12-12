import { MusicStreamingServiceApi, DomApi, MusicStreamingServiceApiClass, StreamingServiceSong } from "./music-streaming-api.model";
import { TidalApiService } from "./music-streaming-apis/tidal-api";

const musicStreamingApiClasses: MusicStreamingServiceApiClass[] = [TidalApiService];

export class MusicStreamingApiService {
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
