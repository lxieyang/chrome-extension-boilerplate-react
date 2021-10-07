import React, { useEffect, useState, createContext } from "react";
import { Tabs } from "webextension-polyfill-ts";
import { getActiveTab, subscribeToActiveTabUrlChange } from "./api/browser-api";

type CurrentTabContextData = Tabs.Tab | undefined;

export const CurrentTabContext = createContext<CurrentTabContextData>(undefined);

export const CurrentTabContextProvider: React.FunctionComponent<{}> = ({ children }) => {
    const [currentTab, setCurrentTab] = useState<CurrentTabContextData>();

    useEffect(() => {
        getActiveTab().then((tab) => setCurrentTab(tab));

        return subscribeToActiveTabUrlChange((tabId, changeInfo, tab) => setCurrentTab(tab));
    }, []);

    return <CurrentTabContext.Provider value={currentTab}>{children}</CurrentTabContext.Provider>;
};
