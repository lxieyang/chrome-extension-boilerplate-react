import React, { useEffect, useState, createContext } from "react";
import { Tabs } from "webextension-polyfill-ts";
import { browserApi } from "./api/browser-api";

type CurrentTabContextData = Tabs.Tab | undefined;

export const CurrentTabContext = createContext<CurrentTabContextData>(undefined);

export const CurrentTabContextProvider: React.FunctionComponent<{}> = ({ children }) => {
    const [currentTab, setCurrentTab] = useState<CurrentTabContextData>();

    useEffect(() => {
        browserApi.getActiveTab().then((tab) => setCurrentTab(tab));

        return browserApi.subscribeToActiveTabUrlChanges((tabId, changeInfo, tab) => setCurrentTab(tab));
    }, []);

    return <CurrentTabContext.Provider value={currentTab}>{children}</CurrentTabContext.Provider>;
};
