import { SongsterrSongInfo } from "../songsterr.model";
import { addClientProperties } from "./add-client-properties.helper";

export async function fetchSongsterrSongInfos(title: string, artist?: string): Promise<SongsterrSongInfo[]> {
    let songsterrSongInfos: SongsterrSongInfo[] | undefined;
    if (artist) {
        const pattern = `${title}%20${artist}`;

        songsterrSongInfos = await fetchPattern(pattern);
    }

    if (!songsterrSongInfos?.length) {
        songsterrSongInfos = await fetchPattern(title);
    }

    // TODO: filter in case of wrong tabs

    songsterrSongInfos.forEach(addClientProperties);

    return songsterrSongInfos;
}

async function fetchPattern(pattern: string, numberOfResults = 1): Promise<SongsterrSongInfo[]> {
    const songInfos = await fetch(`https://www.songsterr.com/api/songs?pattern=${pattern}&size=${numberOfResults}`).then((res) =>
        res.json()
    );

    return songInfos;
}
