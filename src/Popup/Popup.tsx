import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CurrentPlayingSong } from "./CurrentPlayingSong";
import { CurrentViewedSongs } from "./CurrentViewedSongs";
import { SongInfo } from "./models";
import { SongsProvider } from "./SongsProvider";

type Props = {
    currentPlayingSong: SongInfo | undefined;
    currentViewSongs: SongInfo[];
};

const PopupComponentWithoutProvider = ({ currentPlayingSong, currentViewSongs }: Props) => {
    return (
        <Container>
            {currentPlayingSong && <CurrentPlayingSong currentPlayingSong={currentPlayingSong} />}

            {currentViewSongs.length ? <CurrentViewedSongs currentViewSongs={currentViewSongs} /> : undefined}
        </Container>
    );
};

export const PopupComponent = SongsProvider(PopupComponentWithoutProvider);

const Container = styled.div`
    max-height: calc(600px - 2 * 0.8em); // 600px is chrome limitation
    overflow: auto;
    padding: 0.8em;
`;
