import { SongInfo } from "../../models";
import { fetchSongstrrSongInfos } from "./helpers/fetch-songstrr-song-infos.helper";
import { songstrrSongInfoToSongInfo } from "./helpers/songstrr-song-info-to-song-info.helper";

export async function getSongInfosFromSongstrr(title: string, artist?: string): Promise<SongInfo[]> {
    const songstrrTrackInfos = await fetchSongstrrSongInfos(title, artist);

    return songstrrTrackInfos.map(songstrrSongInfoToSongInfo);
}
