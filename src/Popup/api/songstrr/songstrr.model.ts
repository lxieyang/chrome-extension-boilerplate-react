export interface SongstrrSongInfo {
    artist: string;
    title: string;
    artistId: number;
    hasAudio: true;
    hasTracks: true;
    songId: number;
    defaultTrack?: number;
    tracks: SongstrrTrackInfo[];
    defaultTrackIndex?: number; // client side
    url?: string; // client side
}

export interface SongstrrTrackInfo {
    difficulty: SongstrrDifficulty;
    tuning: number[];
    instrumentId: number;
}

export enum SongstrrDifficulty {
    VERY_EASY = "VERY_EASY",
    EASY = "EASY",
    BELOW_INTERMEDIATE = "BELOW_INTERMEDIATE",
    INTERMEDIATE = "INTERMEDIATE",
    HARD = "HARD",
    VERY_HARD = "VERY_HARD",
}
