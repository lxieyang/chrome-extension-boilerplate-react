import React, { useEffect, useState, createContext } from "react";
import { Tabs } from "webextension-polyfill-ts";
import { getActiveTab, subscribeToActiveTabUrlChange } from "./api/browser-api";

type CurrentTabContextData = Tabs.Tab | undefined;

const CurrentTabContextWithProvider = createContext<CurrentTabContextData>(undefined);

export const CurrentTabContextProvider: React.FunctionComponent<{}> = ({ children }) => {
    const [currentTab, setCurrentTab] = useState<CurrentTabContextData>();

    useEffect(() => {
        getActiveTab().then((tab) => setCurrentTab(tab));

        return subscribeToActiveTabUrlChange((tabId, changeInfo, tab) => setCurrentTab(tab));
    }, []);

    return <CurrentTabContextWithProvider.Provider value={currentTab}>{children}</CurrentTabContextWithProvider.Provider>;
};

export const CurrentTabContext: Exclude<React.Context<CurrentTabContextData>, "Provider"> = CurrentTabContextWithProvider;
