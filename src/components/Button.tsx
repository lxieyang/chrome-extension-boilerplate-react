import React from "react";

interface ButtonProps {
    onClick: () => void;
    text: string;
}

function Button({onClick, text}: ButtonProps) {
    return (<button className="border-2 w-fit text-lg px-1 rounded-lg hover:bg-sky-200" onClick={onClick}>{text}</button>)
}

export default Button;