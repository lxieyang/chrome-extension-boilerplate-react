import { SongInfo } from "../../models";
import { fetchSongsterrSongInfos } from "./helpers/fetch-songsterr-song-infos.helper";
import { songsterrSongInfoToSongInfo } from "./helpers/songsterr-song-info-to-song-info.helper";

// TODO: set as an interface to support more APIs

export async function getSongInfosFromSongsterr(title: string, artist?: string): Promise<SongInfo[] | undefined> {
    const songsterrTrackInfos = await fetchSongsterrSongInfos(title, artist);

    return songsterrTrackInfos?.map(songsterrSongInfoToSongInfo);
}
