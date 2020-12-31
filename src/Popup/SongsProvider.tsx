import React, { useEffect, useState } from "react";
import { getActiveTab, subscribeToActiveTabUrlChange } from "./api/browser-api";
import { getCurrentPlayingSongFromTab, getCurrentViewSongsFromTab } from "./api/content-scripts-api";
import { getSongInfoFromSongsterr } from "./api/songsterr";
import { SongInfo } from "./models";

export const SongsProvider = (
    WrappedComponent: (props: { currentPlayingSong: SongInfo | undefined; currentViewSongs: SongInfo[] }) => JSX.Element
) => () => {
    const [currentPlayingSong, setCurrentPlayingSong] = useState<SongInfo | undefined>();
    const [currentViewSongs, setCurrentViewSongs] = useState<SongInfo[]>([]);

    const updateCurrentViewData = updateCurrentViewDataCreator(setCurrentPlayingSong, setCurrentViewSongs);

    useEffect(() => {
        getActiveTab().then((tab) => updateCurrentViewData(tab.id!));

        return subscribeToActiveTabUrlChange(updateCurrentViewData);
    }, []);

    return <WrappedComponent currentPlayingSong={currentPlayingSong} currentViewSongs={currentViewSongs} />;
};

const updateCurrentViewDataCreator = (
    setCurrentPlayingSong: React.Dispatch<React.SetStateAction<SongInfo | undefined>>,
    setCurrentViewSongs: React.Dispatch<React.SetStateAction<SongInfo[]>>
) => (tabId: number) => {
    getCurrentPlayingSongFromTab(tabId)
        .then(async (song) => song && ((await getSongInfoFromSongsterr(song.title, song.artist)) ?? song))
        .then(setCurrentPlayingSong);

    getCurrentViewSongsFromTab(tabId)
        .then((songs) =>
            Promise.all(songs?.map((song) => getSongInfoFromSongsterr(song.title, song.artist).then((songInfo) => songInfo ?? song)) ?? [])
        )
        .then(setCurrentViewSongs);
};
