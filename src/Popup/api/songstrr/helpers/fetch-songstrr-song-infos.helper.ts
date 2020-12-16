import { SongstrrSongInfo } from "../songstrr.model";
import { addClientProperties } from "./add-client-properties.helper";

export async function fetchSongstrrSongInfos(title: string, artist?: string): Promise<SongstrrSongInfo[]> {
    let songstrrSongInfos: SongstrrSongInfo[] | undefined;
    if (artist) {
        const pattern = `${title}%20${artist}`;

        songstrrSongInfos = await fetchPattern(pattern);
    }

    if (!songstrrSongInfos?.length) {
        songstrrSongInfos = await fetchPattern(title);
    }

    // TODO: filter in case of wrong tabs

    songstrrSongInfos.forEach(addClientProperties);

    return songstrrSongInfos;
}

async function fetchPattern(pattern: string, numberOfResults = 1): Promise<SongstrrSongInfo[]> {
    const songInfos = await fetch(`https://www.songsterr.com/api/songs?pattern=${pattern}&size=${numberOfResults}`).then((res) =>
        res.json()
    );

    return songInfos;
}
