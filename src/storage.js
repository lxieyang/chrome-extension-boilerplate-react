export function set (key, value) {
    chrome.storage.sync.set({key: value}, function() {
        console.log('Value is set to ' + value);
    });
}

export async function get (key) {
    return await chrome.storage.sync.get([key]);
}