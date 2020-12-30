import React from "react";
import styled from "styled-components";

import { SongInfo, StylesMap } from "./models";

const StyledSongItem = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto;
    grid-template-areas: "title difficulty" "artist tuning";
    grid-gap: 0.5em;

    background: hsl(0, 0%, 16%);
    padding: 0.5em;
    border-radius: 0.5em;

    &:hover {
        background: hsl(0, 0%, 24%);
    }
`;

type Props = {
    songInfo: SongInfo;
};
export const SongItemComponent = ({ songInfo }: Props) => (
    <>
        <a style={styles.a} href={songInfo.url} target="_blank" rel="noopener noreferrer">
            <StyledSongItem>
                <div style={styles.title}>{songInfo.title}</div>
                <div style={styles.difficulty}>{songInfo.difficulty}</div>
                <div style={styles.artist}>{songInfo.artist}</div>
                <div style={styles.tuning}>{songInfo.tuning}</div>
            </StyledSongItem>
        </a>
    </>
);

const styles: StylesMap = {
    title: {
        gridColumn: "title",
        textAlign: "start",
    },
    artist: {
        gridColumn: "artist",
        textAlign: "start",
    },
    difficulty: {
        gridColumn: "difficulty",
        textAlign: "end",
    },
    tuning: {
        gridColumn: "tuning",
        textAlign: "end",
    },
    a: {
        display: "inline",
    },
};
