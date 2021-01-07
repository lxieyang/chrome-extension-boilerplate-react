import React from "react";
import styled from "styled-components";
import { CurrentTabContextProvider } from "./CurrentTab.context";
import { SongsView } from "./SongsView/SongsView";

export const PopupComponent: React.FunctionComponent = () => {
    return (
        <CurrentTabContextProvider>
            <Container>
                <SongsView />
            </Container>
        </CurrentTabContextProvider>
    );
};

const Container = styled.div`
    max-height: calc(600px - 2 * 0.8em); // 600px is chrome limitation
    overflow-y: scroll;
    padding: 0.8em;
    padding-right: max(calc(0.8em - 10px), 2px);
`;
