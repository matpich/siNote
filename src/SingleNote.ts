import { SingleNote, display } from "./main";

interface NoteCreator extends SingleNote {
    newNote: () => void;
    deleteNote: () => void;
    newTask: () => void;
    deleteTask: () => void;
}

export class Note implements NoteCreator {
    constructor (public category: string, public title: string, public tasks: [string, boolean] [] = []) {

    }

    newNote() {
        const newNote: SingleNote = {category: "main", title: Date.now().toString(), tasks: [['eggs', false], ['sausage', true]]};
        
        localStorage.setItem("notes", JSON.stringify([newNote]));
        display.displayCategory("main");
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