import { Note } from "./SingleNote";
import { Display } from "./Display";

export type SingleNote = {
    category: string;
    title: string;
    tasks: [string, boolean] []
};

export const display = Display.getDisplay();

document.querySelector('#new-note')?.addEventListener('click', ()=> {
    const asd = new Note('Cat', 'Title');
    asd.newNote();
})