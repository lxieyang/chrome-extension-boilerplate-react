import React from "react";
import styled from "styled-components";
import { CurrentTabContextProvider } from "./CurrentTab.context";
import { DynamicHeightTransition } from "./shared-components/DynamicHeightTransition";
import { SongsView } from "./SongsView/SongsView";

export const PopupComponent: React.FunctionComponent = () => (
    <CurrentTabContextProvider>
        <PopupContainer>
            <DynamicHeightTransition>
                <SongsView />
            </DynamicHeightTransition>
        </PopupContainer>
    </CurrentTabContextProvider>
);

const PopupContainer = styled.div`
    max-height: calc(600px - 2 * 0.8em); // 600px is chrome limitation
    overflow-y: scroll;
    padding: 0.8em;
    padding-inline-end: max(calc(0.8em - 10px), 2px);
`;
