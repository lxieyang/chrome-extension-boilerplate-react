import React from "react";
import styled from "styled-components";
import { songDifficultySorted, songDifficultyToNumberMap } from "./helpers/song-difficulty-number";
import { SongDifficulty } from "./models";

export const DifficultyBarComponent = ({ songDifficulty }: { songDifficulty: SongDifficulty }) => {
    const difficultyAsNumber: number | undefined = songDifficulty && +songDifficultyToNumberMap[songDifficulty];

    return (
        <DifficultyBar title={songDifficulty}>
            {[...new Array(difficultyAsNumber)].map((x, index) => (
                <div key={index}></div>
            ))}
        </DifficultyBar>
    );
};

const DifficultyBar = styled.div`
    display: grid;
    grid-template-columns: repeat(${songDifficultySorted.length + 1}, 3px);
    grid-gap: 2px;
    padding: 2px;
    border: 1px solid hsla(0, 0%, 100%, 32%);

    > div {
        background-color: hsla(0, 0%, 100%, 32%);
    }
`;
