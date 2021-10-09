import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useResizeOberver } from "../helpers/use-resize-oberver.hook";

export const DynamicHeightTransition: React.FunctionComponent<{ getHeightRule: (containerSize: number) => string; className?: string }> = ({
    children,
    getHeightRule,
    className,
}) => {
    const contentContainer = useRef<HTMLDivElement | null>(null);

    const [containerSize, setContainerSize] = useState<number>(0);
    const [heightRule, setHeightRule] = useState<string>(() => getHeightRule(containerSize));

    const wrapperResizeCallback = useRef((resizeObserverEntry: ResizeObserverEntry) => {
        if (resizeObserverEntry) {
            const newContainerSize = resizeObserverEntry.borderBoxSize[0].blockSize;

            setContainerSize(Math.min(newContainerSize));
        }
    });

    const [setTarget, setCallback] = useResizeOberver(contentContainer.current, wrapperResizeCallback.current);
    useEffect(() => {
        setTarget(contentContainer.current as any);
    }, [contentContainer.current]);

    useEffect(() => {
        setHeightRule(getHeightRule(containerSize));
    }, [containerSize]);

    return (
        <WrapperContainer heightRule={heightRule} className={className}>
            <ContentContainer ref={contentContainer}>{children}</ContentContainer>
        </WrapperContainer>
    );
};

const WrapperContainer = styled.div<{ heightRule: string }>`
    height: ${(props) => props.heightRule};
    transition: height 0.3s ease-in-out;
`;

const ContentContainer = styled.div`
    overflow-y: scroll;
`;
