import { useContext, useEffect, useState } from "react";
import { contentScriptApi } from "../api/content-scripts-api";
import { getSongInfoFromSongsterr } from "../api/songsterr";
import { CurrentTabContext } from "../CurrentTab.context";
import { SongInfo } from "../models";

export function useCurrentViewSongs(): SongInfo[] {
    const currentTab = useContext(CurrentTabContext);

    const [currentViewSongs, setCurrentViewSongs] = useState<SongInfo[]>([]);

    useEffect(() => {
        const currentTabId = currentTab?.id;

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

    return currentViewSongs;
}
