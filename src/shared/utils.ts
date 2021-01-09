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

// https://minaluke.medium.com/typescript-compose-function-b7512a7cc012
type ArityOneFn = (arg: any) => any;
type PickLastInTuple<T extends any[]> = T extends [...rest: infer U, argn: infer L] ? L : never;
type FirstFnParameterType<T extends any[]> = Parameters<PickLastInTuple<T>>[any];
type LastFnReturnType<T extends any[]> = ReturnType<T[0]>;
export const compose = <T extends ArityOneFn[]>(...fns: T) => (p: FirstFnParameterType<T>): LastFnReturnType<T> =>
    fns.reduceRight((acc: any, cur: any) => cur(acc), p);
