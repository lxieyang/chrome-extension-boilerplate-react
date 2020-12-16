export function findIndexWithUndefined<T>(array: T[], comperator: (item: T) => boolean): number | undefined {
    const result = array.findIndex(comperator);

    return result !== -1 ? result : undefined;
}
