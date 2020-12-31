import { SongsterrDifficulty, SongsterrSongInfo } from "./songsterr.model";
import { SongDifficulty, SongInfo, TabsWebsite } from "../../../models";

export function songsterrSongInfoToSongInfo(innerSongInfo: SongsterrSongInfo): SongInfo {
    const defaultTrack = innerSongInfo.tracks[innerSongInfo.defaultTrackIndex!];
    const difficulty = songsterrDifficultyToSongDifficulty(defaultTrack.difficulty);

    return {
        artist: innerSongInfo.artist,
        title: innerSongInfo.title,
        url: innerSongInfo.url!,
        difficulty,
        from: TabsWebsite.Songsterr,
        tuning: defaultTrack.tuning,
    };
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
