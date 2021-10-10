import { useContext, useEffect, useState } from "react";
import { contentScriptApi } from "../api/content-scripts-api";
import { getSongInfoFromSongsterr } from "../api/songsterr";
import { CurrentTabContext } from "../CurrentTab.context";
import { SongInfo } from "../models";

type CurrentPlayingSongData = SongInfo | undefined;

export function useCurrentPlayingSong(): CurrentPlayingSongData {
    const currentTab = useContext(CurrentTabContext);

    const [currentPlayingSong, setCurrentPlayingSong] = useState<CurrentPlayingSongData>();

    useEffect(() => {
        const currentTabId = currentTab?.id;

        if (currentTabId !== undefined) {
            return contentScriptApi.subscribeToCurrentPlayingSongFromTab(currentTabId, () =>
                contentScriptApi
                    .getCurrentPlayingSongFromTab(currentTabId)
                    .then(async (song) => song && ((await getSongInfoFromSongsterr(song.title, song.artist)) ?? song))
                    .then(setCurrentPlayingSong)
            );
        }
    }, [currentTab]);

    return currentPlayingSong;
}
