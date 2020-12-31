import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getActiveTab, subscribeToActiveTabUrlChange } from "./api/browser-api";
import { getCurrentPlayingSongFromTab, getCurrentViewSongsFromTab } from "./api/content-scripts-api";
import { getSongInfoFromSongsterr } from "./api/songsterr";
import { CurrentPlayingSongComponent } from "./current-playing-song.component";
import { CurrentViewedSongsComponent } from "./current-viewed-songs.component";
import { SongInfo } from "./models";

export const PopupComponent = () => {
    const [currentPlayingSong, setCurrentPlayingSong] = useState<SongInfo | undefined>();
    const [currentViewSongs, setCurrentViewSongs] = useState<SongInfo[]>([]);

    useEffect(() => {
        getActiveTab().then((tab) => logCurrentViewData(tab.id!));

        return subscribeToActiveTabUrlChange(logCurrentViewData);

        function logCurrentViewData(tabId: number) {
            getCurrentPlayingSongFromTab(tabId)
                .then(async (song) => song && ((await getSongInfoFromSongsterr(song.title, song.artist)) ?? song))
                .then(setCurrentPlayingSong);

            getCurrentViewSongsFromTab(tabId)
                .then((songs) =>
                    Promise.all(
                        songs?.map((song) => getSongInfoFromSongsterr(song.title, song.artist).then((songInfo) => songInfo ?? song)) ?? []
                    )
                )
                .then(setCurrentViewSongs);
        }
    }, []);

    return (
        <Container>
            {currentPlayingSong && <CurrentPlayingSongComponent currentPlayingSong={currentPlayingSong} />}

            {currentViewSongs.length ? <CurrentViewedSongsComponent currentViewSongs={currentViewSongs} /> : undefined}
        </Container>
    );
};

const Container = styled.div`
    max-height: calc(600px - (0.8 * 2) em); // 600px is chrome limitation
    overflow: auto;
    padding: 0.8em;
`;
