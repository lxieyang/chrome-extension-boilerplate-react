import React, { useRef } from "react";
import styled from "styled-components";
import { CurrentTabContextProvider } from "./CurrentTab.context";
import { DynamicHeightTransition } from "./shared-components/DynamicHeightTransition";
import { SongsView } from "./SongsView/SongsView";

export const PopupComponent: React.FunctionComponent = () => {
    const getHeightRule = useRef((containerSize: number) => `min(calc(${containerSize}px, 600px - 2 * 0.8em))`); // 600px is chrome limitation

    return (
        <CurrentTabContextProvider>
            <StyledDynamicHeightTransitionstyled getHeightRule={getHeightRule.current as any}>
                <SongsView />
            </StyledDynamicHeightTransitionstyled>
        </CurrentTabContextProvider>
    );
};

const StyledDynamicHeightTransitionstyled = styled(DynamicHeightTransition)`
    overflow: hidden;
    padding: 0.8em;
    padding-inline-end: max(calc(0.8em - 10px), 2px);
`;
