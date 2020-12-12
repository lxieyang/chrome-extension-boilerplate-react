import { createDomApi } from "./music-streaming-api/create-dom-api";
import { MusicStreamingApiService } from "./music-streaming-api/music-streaming-api.service";

console.log("Content script works!");
console.log("Must reload extension for modifications to take effect.");

let musicStreamingApiService: MusicStreamingApiService;
function getCurrentSongs() {
    console.time("getCurrentSongs");

    if (!musicStreamingApiService) {
        const domApi = createDomApi();
        musicStreamingApiService = new MusicStreamingApiService(domApi);
    }

    const currentPlayingSong = musicStreamingApiService.getCurrentPlayingSong();
    const currentViewSongs = musicStreamingApiService.getCurrentViewSongs();

    console.timeEnd("getCurrentSongs");

    return {
        currentPlayingSong,
        currentViewSongs,
    };
}

setInterval(() => {
    console.log(getCurrentSongs());
}, 5000);
