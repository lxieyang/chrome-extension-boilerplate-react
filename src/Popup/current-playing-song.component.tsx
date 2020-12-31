import React from "react";
import styled from "styled-components";
import { SongInfo } from "./models";
import { SectionTitleComponent } from "./shared-components/section-title.component";
import { SongItemComponent } from "./shared-components/song-item.component";

export const CurrentPlayingSongComponent = ({ currentPlayingSong }: { currentPlayingSong: SongInfo }) => (
    <Container>
        <SectionTitleComponent>Playing Now</SectionTitleComponent>

        <SongItemComponent songInfo={currentPlayingSong} />
    </Container>
);

const Container = styled.div``;
