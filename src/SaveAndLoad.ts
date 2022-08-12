import { ParseDOMString } from "./ParseDOMString";

export class SaveAndLoad {
    static saveToCookies(): void {
        console.log(ParseDOMString.domToString());    
        document.cookie = `notes=${ParseDOMString.domToString()}`;
    }
}