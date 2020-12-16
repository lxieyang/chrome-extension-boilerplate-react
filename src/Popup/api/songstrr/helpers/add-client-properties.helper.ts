import { SongstrrSongInfo } from "../songstrr.model";
import { findIndexWithUndefined } from "../../../../shared/utils";

export function addClientProperties(innerSongInfo: SongstrrSongInfo) {
    innerSongInfo.defaultTrackIndex = getDefaultTrackIndex(innerSongInfo);
    innerSongInfo.url = getSongUrl(innerSongInfo);
}

function getSongUrl(innerSongInfo: SongstrrSongInfo): string {
    const songstrrTitle = toSongstrrTitle(`${innerSongInfo.artist}-${innerSongInfo.title}`);

    return `https://www.songsterr.com/a/wsa/${songstrrTitle}-tab-s${innerSongInfo.songId}t${innerSongInfo.defaultTrackIndex}`;
}

const guitarInstrumentIds = new Set([
    27, // Electric Guitar (clean)
    30, // Distortion Guitar
]);
const bassGuitarInstrumentIds = new Set([
    33, // Electric Bass (finger)
    34, // Electric Bass (pick)
]);

function getDefaultTrackIndex(innerSongInfo: SongstrrSongInfo): number {
    return (
        innerSongInfo.defaultTrack ??
        findIndexWithUndefined(innerSongInfo.tracks, (track) => guitarInstrumentIds.has(track.instrumentId)) ??
        findIndexWithUndefined(innerSongInfo.tracks, (track) => bassGuitarInstrumentIds.has(track.instrumentId)) ??
        0
    );
}

function toSongstrrTitle(string: string): string {
    // from original code
    return string
        .toLowerCase()
        .replace(/\//g, "-")
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-_]/g, "")
        .replace(/-+/g, "-")
        .replace(/^-*/g, "");
}
