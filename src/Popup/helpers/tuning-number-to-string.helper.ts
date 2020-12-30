const LETTERS = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

export function tuningNumberToString(tuningNumber: number): string {
    return LETTERS[(tuningNumber + 3) % LETTERS.length];
}
