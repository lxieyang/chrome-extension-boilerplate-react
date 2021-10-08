export class DomApi {
    getCurrentUrl(): string {
        return document.URL;
    }

    querySelector(selector: string): Element | null {
        return document.querySelector(selector);
    }

    querySelectorAll(selector: string): NodeListOf<Element> {
        return document.querySelectorAll(selector);
    }
}
