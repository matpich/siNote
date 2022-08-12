import { SingleNote, display } from "./main";
import { SaveAndLoad } from "./SaveAndLoad"

interface NoteCreator extends SingleNote {
    newNote: () => void;
    deleteNote: () => void;
    newTask: () => void;
    deleteTask: () => void;
}

export class Note implements NoteCreator {
    constructor (public category: string, public title: string, public tasks: ["text" | "task", string, boolean?] []) {}

    newNote() {   
        display.displaySingleNote({category: this.category, title: this.title, tasks: this.tasks})
        SaveAndLoad.saveToCookies();
    }

    deleteNote() {
        console.log(this.deleteNote);
    }

    newTask() {
        console.log(this.newTask);
    }

    deleteTask() {
        console.log(this.deleteNote);
    }
}