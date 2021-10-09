import React from "react";
import { SongList } from "./components/SongList";
import { useCurrentPlayingSong } from "./useCurrentPlayingSong.hook";
import { useCurrentViewSongs } from "./useCurrentViewSongs.hook";

export const SongsView: React.FunctionComponent = () => {
    const currentPlayingSong = useCurrentPlayingSong();
    const currentViewSongs = useCurrentViewSongs();

    return (
        <>
            {currentPlayingSong && <SongList songList={[currentPlayingSong]} title="Playing Now" />}

            {currentViewSongs.length ? <SongList songList={currentViewSongs} title="Current View" /> : undefined}
        </>
    );
};
