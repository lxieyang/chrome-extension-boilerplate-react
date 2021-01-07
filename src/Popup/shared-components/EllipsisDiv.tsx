import React from "react";
import styled from "styled-components";

export const EllipsisOneLine = styled.div`
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

export const EllipsisOneLineWithTooltip: React.FunctionComponent<{ text: string | undefined; className?: string }> = ({
    text,
    className,
}) => (
    <EllipsisOneLine title={text} className={className}>
        {text}
    </EllipsisOneLine>
);
