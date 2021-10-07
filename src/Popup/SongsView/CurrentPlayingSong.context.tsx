import React, { useState, useEffect, useContext, createContext } from "react";
import { getCurrentPlayingSongFromTab } from "../api/content-scripts-api";
import { getSongInfoFromSongsterr } from "../api/songsterr";
import { CurrentTabContext } from "../CurrentTab.context";
import { SongInfo } from "../models";

type CurrentPlayingSongContextData = SongInfo | undefined;

export const CurrentPlayingSongContext = createContext<CurrentPlayingSongContextData>(undefined);

export const CurrentPlayingSongProvider: React.FunctionComponent<{}> = ({ children }) => {
    const currentTab = useContext(CurrentTabContext);
    const currentTabId = currentTab?.id;

    const [currentPlayingSong, setCurrentPlayingSong] = useState<CurrentPlayingSongContextData>();

    useEffect(() => {
        if (currentTabId !== undefined) {
            getCurrentPlayingSongFromTab(currentTabId)
                .then(async (song) => song && ((await getSongInfoFromSongsterr(song.title, song.artist)) ?? song))
                .then(setCurrentPlayingSong);
        }
    }, [currentTab]);

    return <CurrentPlayingSongContext.Provider value={currentPlayingSong}>{children}</CurrentPlayingSongContext.Provider>;
};
