import { DomApi } from "./music-streaming-api.model";

export function createDomApi(): DomApi {
    return {
        getCurrentUrl() {
            return document.URL;
        },
        querySelector(selector: string) {
            return document.querySelector(selector);
        },
        querySelectorAll(selector: string) {
            return document.querySelectorAll(selector);
        },
    };
}
