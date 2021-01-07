import React from "react";
import styled from "styled-components";
import { SongList } from "./components/SongList";
import { CurrentPlayingSongProvider } from "./CurrentPlayingSong.provider";
import { CurrentViewSongsProvider } from "./CurrentViewSongs.provider";

export const SongsView: React.FunctionComponent = () => (
    <Container>
        <CurrentPlayingSongProvider>
            {(currentPlayingSong) => <>{currentPlayingSong && <SongList songList={[currentPlayingSong]} title="Playing Now" />}</>}
        </CurrentPlayingSongProvider>

        <CurrentViewSongsProvider>
            {(currentViewSongs) => (
                <>{currentViewSongs.length ? <SongList songList={currentViewSongs} title="Current View" /> : undefined}</>
            )}
        </CurrentViewSongsProvider>
    </Container>
);

const Container = styled.div``;
