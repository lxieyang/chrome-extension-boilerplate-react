export function getActiveTab(): Promise<chrome.tabs.Tab> {
    return new Promise((resolve) => {
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            const activeTab = tabs[0];

            resolve(activeTab);
        });
    });
}

export function subscribeToActiveTabChanges(
    callback: (tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => void
): () => void {
    const onUpdateListener = (tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
        if (tab.active && changeInfo.url) {
            callback(tabId, changeInfo, tab);
        }
    };
    const unsubscribeFunction = () => chrome.tabs.onUpdated.removeListener(onUpdateListener);

    chrome.tabs.onUpdated.addListener(onUpdateListener);

    return unsubscribeFunction;
}
