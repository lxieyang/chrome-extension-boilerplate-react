const baseUrl = "https://www.songsterr.com";
const guitarInstrumentIds = new Set([
    27, // Electric Guitar (clean)
    30, // Distortion Guitar
]);
const bassGuitarInstrumentIds = new Set([
    33, // Electric Bass (finger)
    34, // Electric Bass (pick)
]);

function getSongUrlFromInnerSongInfo(songInfo: InnerSongInfo): string {
    const { artist, title, songId } = songInfo;
    const defaultTrackIndex = getDefaultTrackIndex(songInfo);

    const artistWithNoSpecialCharacters = removeSpecialCharacters(artist);
    const titleWithNoSpecialCharacters = removeSpecialCharacters(title);

    return `${baseUrl}/a/wsa/${artistWithNoSpecialCharacters}=${titleWithNoSpecialCharacters}-tab-s${songId}t${defaultTrackIndex}`;
}

function getDefaultTrackIndex(songInfo: InnerSongInfo): number {
    return (
        findIndexWithUndefined(songInfo.tracks, (track) => guitarInstrumentIds.has(track.instrumentId)) ??
        findIndexWithUndefined(songInfo.tracks, (track) => bassGuitarInstrumentIds.has(track.instrumentId)) ??
        0
    );
}

interface InnerSongInfo {
    artist: string;
    title: string;
    artistId: number;
    hasAudio: true;
    hasTracks: true;
    songId: number;
    tracks: InnerTrackInfo[];
}

interface InnerTrackInfo {
    difficulty: string;
    tuning: string[];
    instrumentId: number;
}

function removeSpecialCharacters(string: string): string {
    return string.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "_");
}

function findIndexWithUndefined<T>(array: T[], comperator: (item: T) => boolean): number | undefined {
    const result = array.findIndex(comperator);

    return result !== -1 ? result : undefined;
}
