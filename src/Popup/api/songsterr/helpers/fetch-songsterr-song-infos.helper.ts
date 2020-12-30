import { SongsterrSongInfo } from "./songsterr.model";

export async function fetchSongsterrSongInfos(title: string, artist?: string): Promise<SongsterrSongInfo[] | undefined> {
    const songsterrSongInfos = await tryTofetchSong(title, artist);

    // TODO: filter in case of wrong tabs

    return songsterrSongInfos;
}

async function tryTofetchSong(title: string, artist?: string): Promise<SongsterrSongInfo[] | undefined> {
    let result: SongsterrSongInfo[] | undefined;
    if (artist) {
        const pattern = `${title}%20${artist}`;

        result = await fetchPattern(pattern);
    }

    if (!result?.length) {
        result = await fetchPattern(title);
    }

    return result;
}

async function fetchPattern(pattern: string, numberOfResults = 1): Promise<SongsterrSongInfo[]> {
    const songInfos = await fetch(`https://www.songsterr.com/api/songs?pattern=${pattern}&size=${numberOfResults}`).then((res) =>
        res.json()
    );

    return songInfos;
}
