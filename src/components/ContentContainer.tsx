import React, { useEffect } from "react";

export interface ContentContainerProps {
    children: React.ReactElement;
    // For UI testing
    _visible?: boolean;
    _disabled?: boolean;
    _minimized?: boolean;
}

const closeIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
</svg>

const openIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
</svg>

const xIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>



export default function ContentContainer({ children, _visible, _disabled, _minimized }: ContentContainerProps) {
    // Visibility State
    const [visible, setVisible] = React.useState(_visible || false);
    const [disabled, setDisabled] = React.useState(_disabled || false);
    const [minimized, setMinimized] = React.useState(true);

    // For UI testing
    useEffect(() => {
        console.log("visibility changed")
        setVisible(_visible || false);
        setDisabled(_disabled || false);
        setMinimized(_minimized || false);
    }, [_visible, _disabled, _minimized]);

    const buttonIcon = minimized ? openIcon : closeIcon;


    return (
        <div className={`${visible && !disabled ? "visible" : "invisible"}`}>
            <div className="fixed top-0 bottom-0 right-0 h-screen flex flex-row items-center bg-slate-100 border-gray-600 border z-max transition ease-in-out">
                <div className="bg-slate-400 flex flex-col self-stretch shadow-lg">
                    <div className="flex self-start">
                        <button className="hover:bg-sky-200 border border-black" onClick={() => setDisabled(true)}>
                            {xIcon}
                        </button>
                    </div>
                    <div className="flex grow self-stretch">
                        <button className="hover:bg-sky-200 border border-black" onClick={() => setMinimized((minimized) => !minimized)}>
                            {buttonIcon}
                        </button>
                    </div>
                </div>
                <div className={`${minimized ? "hidden" : ""} self-start`}>
                    {React.cloneElement(children, { setVisible: setVisible, setDisabled: setDisabled })}
                </div>
            </div>
        </div>
    );
}