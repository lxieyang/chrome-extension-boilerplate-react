import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useResizeOberver } from "../helpers/use-resize-oberver.hook";

export const DynamicHeightTransition: React.FunctionComponent<{ className?: string }> = ({ children, className }) => {
    const contentContainer = useRef<HTMLDivElement | null>(null);

    const [containerSize, setContainerSize] = useState<number>(0);

    const wrapperResizeCallback = useCallback((resizeObserverEntry: ResizeObserverEntry) => {
        if (resizeObserverEntry) {
            const newContainerSize = resizeObserverEntry.borderBoxSize[0].blockSize;

            setContainerSize(newContainerSize);
        }
    }, []);

    const [setTarget, setCallback] = useResizeOberver(contentContainer.current, wrapperResizeCallback);
    useEffect(() => {
        setTarget(contentContainer.current);
    }, [contentContainer.current]);

    return (
        <WrapperContainer containerSize={containerSize} className={className}>
            <ContentContainer ref={contentContainer}>{children}</ContentContainer>
        </WrapperContainer>
    );
};

const WrapperContainer = styled.div<{ containerSize: number }>`
    height: ${(props) => props.containerSize}px;
    transition: height 0.3s ease-in-out;
    overflow: hidden;
`;

const ContentContainer = styled.div``;
