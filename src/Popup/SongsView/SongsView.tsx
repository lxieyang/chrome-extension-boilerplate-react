import React from "react";
import styled from "styled-components";
import { SongList } from "./components/SongList";
import { CurrentPlayingSongContext, CurrentPlayingSongProvider } from "./CurrentPlayingSong.context";
import { CurrentViewSongsContext, CurrentViewSongsProvider } from "./CurrentViewSongs.context";

export const SongsView: React.FunctionComponent = () => (
    <Container>
        <CurrentPlayingSongProvider>
            <CurrentPlayingSongContext.Consumer>
                {(currentPlayingSong) => <>{currentPlayingSong && <SongList songList={[currentPlayingSong]} title="Playing Now" />}</>}
            </CurrentPlayingSongContext.Consumer>
        </CurrentPlayingSongProvider>

        <CurrentViewSongsProvider>
            <CurrentViewSongsContext.Consumer>
                {(currentViewSongs) => (
                    <>{currentViewSongs.length ? <SongList songList={currentViewSongs} title="Current View" /> : undefined}</>
                )}
            </CurrentViewSongsContext.Consumer>
        </CurrentViewSongsProvider>
    </Container>
);

const Container = styled.div``;
