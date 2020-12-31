import React from "react";
import styled from "styled-components";
import { SongInfo } from "./models";
import { SectionTitleComponent } from "./shared-components/section-title.component";
import { SongItemComponent } from "./shared-components/song-item.component";

export const CurrentViewedSongsComponent = ({ currentViewSongs }: { currentViewSongs: SongInfo[] }) => {
    return (
        <Container>
            <SectionTitleComponent>Current View</SectionTitleComponent>

            {currentViewSongs.map((viewedSong, index) => (
                <SongItemComponentWrapper>
                    <SongItemComponent songInfo={viewedSong!} key={index} />
                </SongItemComponentWrapper>
            ))}
        </Container>
    );
};

const Container = styled.div``;

const SongItemComponentWrapper = styled.div`
    margin: 0.8em 0;
`;
