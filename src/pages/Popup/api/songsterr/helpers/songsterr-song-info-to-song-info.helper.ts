import { SongsterrDifficulty, SongsterrSongInfo, SongsterrTrackInfo } from "./songsterr.model";
import { SongDifficulty, SongInfo, TabsWebsite } from "../../../models";

export function songsterrSongInfoToSongInfo(innerSongInfo: SongsterrSongInfo): SongInfo {
    const defaultTrack = innerSongInfo.tracks[innerSongInfo.defaultTrackIndex!];

    return {
        artist: innerSongInfo.artist,
        title: innerSongInfo.title,
        url: innerSongInfo.url!,
        difficulty: getTrackDifficulty(defaultTrack),
        from: TabsWebsite.Songsterr,
        tuning: defaultTrack.tuning,
    };
}
function getTrackDifficulty(track: SongsterrTrackInfo): SongDifficulty {
    const difficultyVersion = track.difficultyVersion;
    const songsterrDifficulty: SongsterrDifficulty = track[`difficultyV${difficultyVersion}`] ?? track.difficulty;

    return songsterrDifficultyToSongDifficulty(songsterrDifficulty);
}

function songsterrDifficultyToSongDifficulty(songsterrDifficulty: SongsterrDifficulty): SongDifficulty {
    switch (songsterrDifficulty) {
        case SongsterrDifficulty.VERY_EASY:
            return SongDifficulty.VaryEasy;
        case SongsterrDifficulty.EASY:
            return SongDifficulty.Easy;
        case SongsterrDifficulty.BELOW_INTERMEDIATE:
            return SongDifficulty.BelowIntermediate;
        case SongsterrDifficulty.INTERMEDIATE:
            return SongDifficulty.Intermediate;
        case SongsterrDifficulty.UPPER_INTERMEDIATE:
            return SongDifficulty.UpperIntermediate;
        case SongsterrDifficulty.HARD:
            return SongDifficulty.Hard;
        case SongsterrDifficulty.VERY_HARD:
            return SongDifficulty.VaryHard;
    }
}
