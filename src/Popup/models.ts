import { StreamingServiceSong } from "../shared/shared.model";

export enum SongDifficulty {
    VaryEasy = "VaryEasy",
    Easy = "Easy",
    BelowIntermediate = "BelowIntermediate",
    Intermediate = "Intermediate",
    Hard = "Hard",
    VaryHard = "VaryHard",
}

export enum TabsWebsite {
    Songstrr = "Songstrr",
}

export interface SongInfo extends StreamingServiceSong {
    tuning: number[];
    difficulty: SongDifficulty;
    from: TabsWebsite;
    url: string;
}
