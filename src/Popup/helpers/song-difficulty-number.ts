import { SongDifficulty } from "../models";

export const songDifficultySorted = [
    SongDifficulty.VaryEasy,
    SongDifficulty.Easy,
    SongDifficulty.BelowIntermediate,
    SongDifficulty.Intermediate,
    SongDifficulty.UpperIntermediate,
    SongDifficulty.Hard,
    SongDifficulty.VaryHard,
];

export const songDifficultyToNumberMap = Object.values(songDifficultySorted).reduce((acc, current, index) => {
    acc[current] = index + 1;
    return acc;
}, {}) as Readonly<{ [key in keyof typeof SongDifficulty]: number }>;

export const songDifficultyNumberToEnumMap = Object.values(songDifficultySorted).reduce((acc, current, index) => {
    acc[index + 1] = current;
    return acc;
}, {}) as Readonly<{ [key: number]: SongDifficulty }>;
