import { SongstrrDifficulty, SongstrrSongInfo } from "../songstrr.model";
import { SongDifficulty, SongInfo, TabsWebsite } from "../../../models";

export function songstrrSongInfoToSongInfo(innerSongInfo: SongstrrSongInfo): SongInfo {
    const defaultTrack = innerSongInfo.tracks[innerSongInfo.defaultTrackIndex!];
    const difficulty = songstrrDifficultyToSongDifficulty(defaultTrack.difficulty);

    return {
        artist: innerSongInfo.artist,
        title: innerSongInfo.title,
        url: innerSongInfo.url!,
        difficulty,
        from: TabsWebsite.Songstrr,
        tuning: defaultTrack.tuning,
    };
}

function songstrrDifficultyToSongDifficulty(songstrrDifficulty: SongstrrDifficulty): SongDifficulty {
    switch (songstrrDifficulty) {
        case SongstrrDifficulty.VERY_EASY:
            return SongDifficulty.VaryEasy;
        case SongstrrDifficulty.EASY:
            return SongDifficulty.Easy;
        case SongstrrDifficulty.BELOW_INTERMEDIATE:
            return SongDifficulty.BelowIntermediate;
        case SongstrrDifficulty.INTERMEDIATE:
            return SongDifficulty.Intermediate;
        case SongstrrDifficulty.HARD:
            return SongDifficulty.Hard;
        case SongstrrDifficulty.VERY_HARD:
            return SongDifficulty.VaryHard;
    }
}
