import { SongInfo } from "../../models";
import { fetchSongsterrSongInfo } from "./helpers/fetch-songsterr-song-info.helper";
import { songsterrSongInfoToSongInfo } from "./helpers/songsterr-song-info-to-song-info.helper";

// TODO: set as an interface to support more APIs

export async function getSongInfoFromSongsterr(title: string, artist?: string): Promise<SongInfo | undefined> {
    try {
        const songsterrTrackInfo = await fetchSongsterrSongInfo(title, artist);

        return songsterrTrackInfo && songsterrSongInfoToSongInfo(songsterrTrackInfo);
    } catch (error) {
        console.info("SHRED getSongInfoFromSongsterr error:", error);
    }
}
