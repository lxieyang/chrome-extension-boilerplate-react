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

// https://dev.to/ascorbic/creating-a-typed-compose-function-in-typescript-3-351i
export const pipe = <T extends any[], R>(fn1: (...args: T) => R, ...fns: Array<(a: R) => R>) => {
    const piped = fns.reduce(
        (prevFn, nextFn) => (value: R) => nextFn(prevFn(value)),
        (value) => value
    );
    return (...args: T) => piped(fn1(...args));
};
