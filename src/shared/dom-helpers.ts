export function waitForElementToDisplay(selector: string, checkFrequencyInMs = 0.5 * 1000, maxTimeoutInMs = 10 * 1000): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const startTimeInMs = Date.now();

        (function loopSearch() {
            if (document.querySelector(selector)) {
                resolve();
            } else {
                setTimeout(() => {
                    if (maxTimeoutInMs && Date.now() - startTimeInMs > maxTimeoutInMs) {
                        reject(`Could not resolve selector: ${selector}`);
                    } else {
                        loopSearch();
                    }
                }, checkFrequencyInMs);
            }
        })();
    });
}
