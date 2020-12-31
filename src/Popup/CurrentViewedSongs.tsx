import React from "react";
import styled from "styled-components";
import { SongInfo } from "./models";
import { SectionTitle } from "./shared-components/SectionTitle";
import { SongItem } from "./shared-components/SongItem";

export const CurrentViewedSongs = ({ currentViewSongs }: { currentViewSongs: SongInfo[] }) => {
    return (
        <Container>
            <SectionTitle>Current View</SectionTitle>

            <SongItemList>
                {currentViewSongs.map((viewedSong, index) => (
                    <SongItem songInfo={viewedSong!} key={index} />
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
