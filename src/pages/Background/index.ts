const SUPPORTED_URLS = ["spotify.com", "tidal.com"];

console.log("This is the background page.");
console.log("Put the background scripts here.");

chrome.runtime.onInstalled.addListener(() => {
    chrome.tabs.onUpdated.addListener((tabId, tabInfo, tab) => updateActionButton(tabId, tab.url));
    chrome.tabs.onActivated.addListener((tabInfo) => {
        chrome.action.disable(tabInfo.tabId);

        chrome.tabs.get(tabInfo.tabId, (tab) => updateActionButton(tabInfo.tabId, tab.url));
    });
});

function updateActionButton(tabId: number, tabUrl: string | undefined): void {
    const isSupported = SUPPORTED_URLS.some((supportedURL) => tabUrl?.match(new RegExp(`^https:\/\/[^\/]+${supportedURL}\/.*$`, "g")));

    if (isSupported) {
        chrome.action.enable(tabId);
    } else {
        chrome.action.disable(tabId);
    }
}
