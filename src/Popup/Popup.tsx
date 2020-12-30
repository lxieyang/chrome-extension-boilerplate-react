import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { subscribeToActiveTabUrlChange, getActiveTab } from "./api/browser-api";
import { getCurrentPlayingSongFromTab, getCurrentViewSongsFromTab } from "./api/content-scripts-api";
import { getSongInfoFromSongsterr } from "./api/songsterr";
import { SongInfo } from "./models";
import "./Popup.scss";
import { SongItemComponent } from "./song-item";

const SongItemComponentWrapper = styled.div`
    margin: 0.8em;
`;

const Popup = () => {
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
        <div className="App">
            {currentPlayingSong && (
                <SongItemComponentWrapper>
                    <SongItemComponent songInfo={currentPlayingSong} />
                </SongItemComponentWrapper>
            )}

            {currentViewSongs.map((viewedSong) => (
                <SongItemComponentWrapper>
                    <SongItemComponent songInfo={viewedSong!} key={viewedSong.title} />
                </SongItemComponentWrapper>
            ))}
        </div>
    );
};

export default Popup;
