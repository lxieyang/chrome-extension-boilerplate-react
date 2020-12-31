import React from "react";
import styled from "styled-components";
import { SongInfo } from "./models";
import { SectionTitle } from "./shared-components/SectionTitle";
import { SongItem } from "./shared-components/SongItem";

export const CurrentPlayingSong = ({ currentPlayingSong }: { currentPlayingSong: SongInfo }) => (
    <Container>
        <SectionTitle>Playing Now</SectionTitle>

        <SongItem songInfo={currentPlayingSong} />
    </Container>
);

const Container = styled.div``;
