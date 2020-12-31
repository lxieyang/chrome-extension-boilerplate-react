import React from "react";
import styled from "styled-components";
import { SongInfo } from "./models";
import { SectionTitleComponent } from "./shared-components/section-title.component";
import { SongItemComponent } from "./shared-components/song-item.component";

export const CurrentViewedSongsComponent = ({ currentViewSongs }: { currentViewSongs: SongInfo[] }) => {
    return (
        <Container>
            <SectionTitleComponent>Current View</SectionTitleComponent>

            <SongItemList>
                {currentViewSongs.map((viewedSong, index) => (
                    <SongItemComponent songInfo={viewedSong!} key={index} />
                ))}
            </SongItemList>
        </Container>
    );
};

const Container = styled.div``;

const SongItemList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.6em;
`;
