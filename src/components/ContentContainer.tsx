import React, { useEffect } from "react";

export interface ContentContainerProps {
    children: React.ReactElement;
    // For UI testing
    _visible?: boolean;
    _disabled?: boolean;
}

export default function ContentContainer({ children, _visible, _disabled }: ContentContainerProps) {
    // Visibility State
    const [visible, setVisible] = React.useState(_visible || false);
    const [disabled, setDisabled] = React.useState(_disabled || false);

    // For UI testing
    useEffect(() => {
        console.log("visibility changed")
        setVisible(_visible || false);
        setDisabled(_disabled || false);
    }, [_visible, _disabled]);

    return (    
        <div style={{ visibility: (visible && !disabled) ? "visible" : "hidden" }}>
            <div className="fixed top-0 bottom-0 right-0 h-screen flex flex-col items-center p-10 bg-gray-400 z-max opacity-50">
                {React.cloneElement(children, {setVisible: setVisible, setDisabled: setDisabled})}
            </div>
        </div>
    );
}