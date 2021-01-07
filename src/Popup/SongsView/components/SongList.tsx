import React from "react";
import styled from "styled-components";
import { SongInfo } from "../../models";
import { SectionTitle } from "../../shared-components/SectionTitle";
import { SongItem } from "./SongItem";

export const SongList = ({ songList, title }: { songList: SongInfo[]; title?: string }) => (
    <Container>
        {title && <SectionTitle>{title}</SectionTitle>}

        {songList.map((songInfo, index) => (
            <SongItem songInfo={songInfo} key={index} />
        ))}
    </Container>
);

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.6em;
`;
