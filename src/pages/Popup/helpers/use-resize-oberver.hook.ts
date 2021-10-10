import { useEffect, useState } from "react";
import { useStateRef } from "./use-state-ref.hook";

type UseResizeOberverTargetProp<T> = T | null;
type UseResizeOberverCallbackProp = (resizeObserverEntry: ResizeObserverEntry) => void;

export function useResizeOberver<T extends HTMLElement>(
    initialTarget: UseResizeOberverTargetProp<T>,
    initialCallback: UseResizeOberverCallbackProp
): [(target: UseResizeOberverTargetProp<T>) => void, (callback: UseResizeOberverCallbackProp) => void] {
    const [callbackRef, setCallback] = useStateRef(initialCallback);
    const [hasCallback, setHasCallback] = useState(!!callbackRef.current);
    useEffect(() => {
        setHasCallback(!!callbackRef.current);
    }, [callbackRef.current]);

    const [target, setTarget] = useState<UseResizeOberverTargetProp<T>>(initialTarget);

    useEffect(() => {
        if (target && hasCallback) {
            const resizeObserver = new ResizeObserver((entries) => {
                callbackRef.current(entries[0]);
            });

            resizeObserver.observe(target);
            const unsubscribeFunction = () => resizeObserver.unobserve(target);

            return unsubscribeFunction;
        }
    }, [target, hasCallback]);

    return [setTarget, setCallback];
}
