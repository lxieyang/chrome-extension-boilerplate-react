import { browser, Tabs } from "webextension-polyfill-ts";
import { MessageAction } from "../../shared/shared.model";

export function getActiveTab(): Promise<Tabs.Tab> {
    return browser.tabs.query({ currentWindow: true, active: true }).then(([currentTab]) => currentTab);
}

export function sendMessageToTab<T>(tabId: number, action: MessageAction, data?: any): Promise<T> {
    return browser.tabs.sendMessage(tabId, { action, data });
}

export function subscribeToActiveTabUrlChange(
    callback: (tabId: number, changeInfo: Tabs.OnUpdatedChangeInfoType, tab: Tabs.Tab) => void
): () => void {
    let waitingForPageToComplete = false;

    const onUpdateCallback = (tabId: number, changeInfo: Tabs.OnUpdatedChangeInfoType, tab: Tabs.Tab) => {
        if (tab.active) {
            if (changeInfo.status === "loading") {
                waitingForPageToComplete = true;
            }

            if (waitingForPageToComplete && changeInfo.status === "complete") {
                callback(tabId, changeInfo, tab);
            }
        }
    };

    browser.tabs.onUpdated.addListener(onUpdateCallback);
    const unsubscribeFunction = () => browser.tabs.onUpdated.removeListener(onUpdateCallback);

    return unsubscribeFunction;
}

// export function subscribeToActiveTabChange(callback: (activeInfo: browser.tabs.TabActiveInfo) => void): () => void {
//     const onActivatedCallback = (activeInfo: browser.tabs.TabActiveInfo) => callback(activeInfo);

//     browser.tabs.onActivated.addListener(onActivatedCallback);
//     const unsubscribeFunction = () => browser.tabs.onActivated.removeListener(onActivatedCallback);

//     return unsubscribeFunction;
// }

// export function subscribeToAnyActiveTabChange(callback: (tabId: number) => void): () => void {
//     const unsubscribeToActiveTabUrlChange = subscribeToActiveTabUrlChange(callback);
//     const unsubscribeToActiveTabChange = subscribeToActiveTabChange((activeInfo) => callback(activeInfo.tabId));

//     const unsubscribeFunction = () => {
//         unsubscribeToActiveTabUrlChange();
//         unsubscribeToActiveTabChange();
//     };

//     return unsubscribeFunction;
// }
