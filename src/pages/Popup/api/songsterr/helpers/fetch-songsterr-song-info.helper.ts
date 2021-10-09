import { getStringsSimilarity } from "../../../../../shared/get-strings-similarity";
import { addClientProperties } from "./add-client-properties.helper";
import { SongsterrSongInfo } from "./songsterr.model";

const MIN_ACCEPTEBLE_SIMILARITY = 0.5;

export async function fetchSongsterrSongInfo(title: string, artist?: string): Promise<SongsterrSongInfo | undefined> {
    const songsterrSongInfos = await tryToFetchSong(title, artist);

    if (songsterrSongInfos) {
        const songsterrSongInfo = songsterrSongInfos.find((info) => isSimilar(info, title, artist));

        songsterrSongInfo && addClientProperties(songsterrSongInfo);

        return songsterrSongInfo;
    }
}

async function tryToFetchSong(title: string, artist?: string): Promise<SongsterrSongInfo[] | undefined> {
    let result: SongsterrSongInfo[] | undefined;
    if (artist) {
        const pattern = `${artist}%20${title}`;

        result = await fetchPattern(pattern);
    }

    if (!result) {
        result = await fetchPattern(title);
    }

    return result;
}

async function fetchPattern(pattern: string, numberOfResults = 5): Promise<SongsterrSongInfo[]> {
    const songInfos = await fetch(`https://www.songsterr.com/api/songs?pattern=${pattern}&size=${numberOfResults}`).then((res) =>
        res.json()
    );

    return songInfos;
}

function isSimilar(info: SongsterrSongInfo, title: string, artist?: string): boolean {
    const isTitleSimilat = getStringsSimilarity(info.title, title) >= MIN_ACCEPTEBLE_SIMILARITY;
    const isArtistSimilar = !artist || getStringsSimilarity(info.artist, artist) >= MIN_ACCEPTEBLE_SIMILARITY;

    return isTitleSimilat && isArtistSimilar;
}
