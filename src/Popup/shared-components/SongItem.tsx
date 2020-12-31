import React from "react";
import styled from "styled-components";
import { tuningNumberToString } from "../helpers/tuning-number-to-string.helper";
import { SongInfo } from "../models";
import { DifficultyBar } from "./DifficultyBar";

export const SongItem = ({ songInfo }: { songInfo: SongInfo }) => {
    const tuningAsString = songInfo.tuning?.map(tuningNumberToString).reverse().join(" ");

    return (
        <InlineLink href={songInfo.url} target="_blank" rel="noopener noreferrer">
            <StyledSongItem isLink={!!songInfo.url}>
                <Title>{songInfo.title}</Title>
                {songInfo.difficulty && (
                    <Difficulty>
                        <DifficultyBar songDifficulty={songInfo.difficulty} />
                    </Difficulty>
                )}
                <Artist>{songInfo.artist}</Artist>
                <Tuning>{tuningAsString}</Tuning>
            </StyledSongItem>
        </InlineLink>
    );
};

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

const Title = styled.div`
    grid-column: title;
    text-align: start;
    font-weight: bold;
`;
const Artist = styled.div`
    grid-column: artist;
    text-align: start;
`;
const Difficulty = styled.div`
    grid-column: difficulty;

    display: flex;
    justify-content: flex-end;
    align-items: center;

    > * {
        height: 0.6em;
    }
`;
const Tuning = styled.div`
    grid-column: tuning;
    text-align: end;
`;
const InlineLink = styled.a`
    display: inline;
`;
