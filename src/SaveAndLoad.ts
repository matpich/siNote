import { ParseDOMString } from "./ParseDOMString";

export class SaveAndLoad {
    static saveToCookies(): void { 
        document.cookie = `notes=${ParseDOMString.domToString()}`;
    }
}