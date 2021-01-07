import { useState, useEffect, useContext, ReactElement } from "react";
import { getCurrentPlayingSongFromTab } from "../api/content-scripts-api";
import { getSongInfoFromSongsterr } from "../api/songsterr";
import { CurrentTabContext } from "../CurrentTab.context";
import { SongInfo } from "../models";

export const CurrentPlayingSongProvider = ({ children }: { children: (value: SongInfo | undefined) => ReactElement }) => {
    const currentTab = useContext(CurrentTabContext);
    const currentTabId = currentTab?.id;

    const [currentPlayingSong, setCurrentPlayingSong] = useState<SongInfo | undefined>();

    useEffect(() => {
        if (currentTabId !== undefined) {
            getCurrentPlayingSongFromTab(currentTabId)
                .then(async (song) => song && ((await getSongInfoFromSongsterr(song.title, song.artist)) ?? song))
                .then(setCurrentPlayingSong);
        }
    }, [currentTab]);

    return children(currentPlayingSong);
};
