import React from "react";

interface ButtonProps {
    onClick: () => void;
    text?: string;
    icon?: SVGElement
    children?: React.ReactNode;
}

function Button({onClick, children}: ButtonProps) {
    return (<button className="border-2 w-fit text-lg px-1 rounded-lg hover:bg-sky-200" onClick={onClick}>{children}</button>)
}

export default Button;