import { ReactElement, useContext, useEffect, useState } from "react";
import { getCurrentViewSongsFromTab } from "../api/content-scripts-api";
import { getSongInfoFromSongsterr } from "../api/songsterr";
import { CurrentTabContext } from "../CurrentTab.context";
import { SongInfo } from "../models";

export const CurrentViewSongsProvider = ({ children }: { children: (value: SongInfo[]) => ReactElement }) => {
    const currentTab = useContext(CurrentTabContext);
    const currentTabId = currentTab?.id;

    const [currentViewSongs, setCurrentViewSongs] = useState<SongInfo[]>([]);

    useEffect(() => {
        if (currentTabId !== undefined) {
            getCurrentViewSongsFromTab(currentTabId)
                .then((songs) =>
                    Promise.all(
                        songs?.map((song) => getSongInfoFromSongsterr(song.title, song.artist).then((songInfo) => songInfo ?? song)) ?? []
                    )
                )
                .then(setCurrentViewSongs);
        }
    }, [currentTab]);

    return children(currentViewSongs);
};
