import React from "react";
import styled from "styled-components";
import { SongInfo, StylesMap } from "./models";
import { tuningNumberToString } from "./helpers/tuning-number-to-string.helper";

const StyledSongItem = styled.div<{ isLink: boolean }>`
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto;
    grid-template-areas: "title difficulty" "artist tuning";
    grid-gap: 0.5em;

    background: hsla(0, 0%, 100%, ${(p) => (p.isLink ? 12 : 6)}%);
    padding: 0.8em;
    border-radius: 0.4em;

    &:hover {
        background: hsla(0, 0%, 100%, ${(p) => (p.isLink ? 16 : 8)}%);
    }
`;

type Props = {
    songInfo: SongInfo;
};
export const SongItemComponent = ({ songInfo }: Props) => {
    const tuningAsString = songInfo.tuning?.map(tuningNumberToString).reverse().join(" ");

    return (
        <>
            <a style={styles.a} href={songInfo.url} target="_blank" rel="noopener noreferrer">
                <StyledSongItem isLink={!!songInfo.url}>
                    <div style={styles.title}>{songInfo.title}</div>
                    <div style={styles.difficulty}>{songInfo.difficulty}</div>
                    <div style={styles.artist}>{songInfo.artist}</div>
                    <div style={styles.tuning}>{tuningAsString}</div>
                </StyledSongItem>
            </a>
        </>
    );
};

const styles: StylesMap = {
    title: {
        gridColumn: "title",
        textAlign: "start",
        fontWeight: 700,
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
