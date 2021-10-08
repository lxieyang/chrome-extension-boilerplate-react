import React, { createContext, useContext, useEffect, useState } from "react";
import { contentScriptApi } from "../api/content-scripts-api";
import { getSongInfoFromSongsterr } from "../api/songsterr";
import { CurrentTabContext } from "../CurrentTab.context";
import { SongInfo } from "../models";

export const CurrentViewSongsContext = createContext<SongInfo[]>([]);

export const CurrentViewSongsProvider: React.FunctionComponent<{}> = ({ children }) => {
    const currentTab = useContext(CurrentTabContext);
    const currentTabId = currentTab?.id;

    const [currentViewSongs, setCurrentViewSongs] = useState<SongInfo[]>([]);

    useEffect(() => {
        if (currentTabId !== undefined) {
            contentScriptApi
                .getCurrentViewSongsFromTab(currentTabId)
                .then((songs) =>
                    Promise.all(
                        songs?.map((song) => getSongInfoFromSongsterr(song.title, song.artist).then((songInfo) => songInfo ?? song)) ?? []
                    )
                )
                .then(setCurrentViewSongs);
        }
    }, [currentTab]);

    return <CurrentViewSongsContext.Provider value={currentViewSongs}>{children}</CurrentViewSongsContext.Provider>;
};
