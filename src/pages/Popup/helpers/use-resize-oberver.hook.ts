import { useEffect, useState } from "react";

type UseResizeOberverTargetProp<T> = T | null;
type UseResizeOberverCallbackProp = (resizeObserverEntry: ResizeObserverEntry) => void;

export function useResizeOberver<T extends HTMLElement>(
    initialTarget: UseResizeOberverTargetProp<T>,
    initialCallback: UseResizeOberverCallbackProp
) {
    const [target, setTarget] = useState<UseResizeOberverTargetProp<T>>(initialTarget);
    const [callback, setCallback] = useState<UseResizeOberverCallbackProp>(() => initialCallback);

    useEffect(() => {
        if (target && !!callback) {
            const resizeObserver = new ResizeObserver((entries) => {
                callback(entries[0]);
            });

            resizeObserver.observe(target);
            const unsubscribeFunction = () => resizeObserver.unobserve(target);

            return unsubscribeFunction;
        }
    }, [target, callback]);

    return [setTarget, setCallback];
}
