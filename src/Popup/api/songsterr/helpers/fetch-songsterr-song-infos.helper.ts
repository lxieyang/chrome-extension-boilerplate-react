import { SongsterrSongInfo } from "./songsterr.model";
import { addClientProperties } from "./add-client-properties.helper";

export async function fetchSongsterrSongInfo(title: string, artist?: string): Promise<SongsterrSongInfo | undefined> {
    const songsterrSongInfo = await tryTofetchSong(title, artist);

    // TODO: filter in case of wrong tabs

    songsterrSongInfo && addClientProperties(songsterrSongInfo);

    return songsterrSongInfo;
}

async function tryTofetchSong(title: string, artist?: string): Promise<SongsterrSongInfo | undefined> {
    let result: SongsterrSongInfo | undefined;
    if (artist) {
        const pattern = `${artist}%20${title}`;

        result = await fetchPattern(pattern);
    }

    if (!result) {
        result = await fetchPattern(title);
    }

    return result;
}

async function fetchPattern(pattern: string, numberOfResults = 1): Promise<SongsterrSongInfo> {
    const songInfos = await fetch(`https://www.songsterr.com/api/songs?pattern=${pattern}&size=${numberOfResults}`).then((res) =>
        res.json()
    );

    return songInfos[0];
}
