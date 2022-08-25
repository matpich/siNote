import { Note } from "./Note";
import { Display } from "./Display";
import { SaveAndLoad } from "./SaveAndLoad";

export type TasksList = ["text" | "task" | "heading", string, boolean?] [];

export type SingleNote = {
    category: string;
    title: string;
    tasks: TasksList;
    id: number;
};

export const display = Display.getDisplay();

document.querySelector('#new-note')?.addEventListener('click', ()=> {
    const asd = new Note('main', "Unnamed", [], new Date().valueOf());
    asd.newNote();
})

//window.addEventListener("load", () => display.displayCategory("asd"))
window.addEventListener("load", SaveAndLoad.saveToCookies)

//this will save notes in the cookies when page is closed
window.addEventListener("beforeunload", () => {
    document.cookie = "beforeClosing='test'";
})