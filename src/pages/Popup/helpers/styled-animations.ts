import { keyframes } from "styled-components";

export const fadeInDown = keyframes`
    from {
        opacity: 0;
        transform: translate3d(0, -100px, 0);
    }

    to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
`;
