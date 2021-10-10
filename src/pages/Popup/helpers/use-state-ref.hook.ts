import { useCallback, useRef } from "react";

// https://github.com/Aminadav/react-useStateRef/blob/master/index.js
export function useStateRef<T>(initialState: T): [React.MutableRefObject<T>, (newState: T) => void] {
    const stateRef = useRef(initialState);

    const setStateFunction = useCallback((newState: T) => {
        stateRef.current = typeof newState === "function" ? newState(stateRef.current) : stateRef;
    }, []);

    return [stateRef, setStateFunction];
}
