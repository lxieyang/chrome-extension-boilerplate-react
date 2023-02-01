import React, { useEffect } from "react";
export default function ContentContainer({ children }) {
    // Visibility State
    const [visible, setVisible] = React.useState(false);
    const [disabled, setDisabled] = React.useState(false);

    useEffect(() => {
        console.log("ContentContainer: " + visible + " " + disabled)
    }, [visible, disabled])

    console.log("ContentContainer: " + visible + " " + disabled)

    return (    
        <div style={{ visibility: (visible && !disabled) ? "visible" : "hidden" }}>
            <div className="fixed top-0 bottom-0 right-0 h-screen flex flex-col items-center p-10 bg-gray-400 z-max opacity-50">
                {React.cloneElement(children, {setVisible: setVisible, setDisabled: setDisabled})}
            </div>
        </div>
    );
}