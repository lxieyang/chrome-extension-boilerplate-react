export function findIndexWithUndefined<T>(array: T[], comperator: (item: T) => boolean): number | undefined {
    const result = array.findIndex(comperator);

    return result !== -1 ? result : undefined;
}

export function times<T>(count: number, iteree: (index: number) => T): T[] {
    const acc = Array(Math.max(0, count));
    for (let i = 0; i < count; i++) {
        acc[i] = iteree(i);
    }

    return acc;
}
