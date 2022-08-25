import { SingleNote } from "./main";
import { TasksList } from "./main";

export class ParseDOMString {
    static domToString (): string {
        const categoryNotes: SingleNote [] = [];
        const notes: NodeList = document.querySelectorAll('*[data-note="note"]');

        notes.forEach((note)   => {
            const noteToSave: SingleNote = {
                category: "main",
                title: "",
                tasks: [],
                id: 0
            }
            ParseDOMString.contentToArray(note.childNodes[1].childNodes, noteToSave);
            categoryNotes.push(noteToSave);
        })
        console.log(categoryNotes);
        return JSON.stringify(categoryNotes);
    }

    private static contentToArray (nodes: NodeListOf <ChildNode>, noteToSave: SingleNote) {
        try {
            nodes.forEach(el => {
                //ignores text nodes
                if (el.nodeType === 1 && (el as HTMLElement).dataset.type === "content") {
                    el.childNodes.forEach(item => {
                        if(item.nodeType === 1) {
                            if ((item as HTMLDivElement).dataset.type === "task") {
                                let inputElement: HTMLInputElement = (item as HTMLDivElement).childNodes[1] as HTMLInputElement;
                                let labelElement: HTMLLabelElement = (item as HTMLDivElement).childNodes[3] as HTMLLabelElement;
                                noteToSave.tasks.push(["task", labelElement.textContent || '', inputElement.checked])
                            } else if ((item as HTMLDivElement).dataset.type === "text") {
                                let divElement: HTMLDivElement = item as HTMLDivElement;
                                noteToSave.tasks.push(["text", divElement.innerText]);
                            } else if((item as HTMLDivElement).dataset.type === "heading") {
                                let headingElement: HTMLDivElement = item as HTMLDivElement;
                                noteToSave.tasks.push(["heading", headingElement.innerText]);
                            }
                        }
                    })
                } else if (el.nodeType === 1 && (el as HTMLElement).dataset.type === "title") {
                    noteToSave.title = (el as HTMLDivElement).innerText;
                }
            });
        } catch {
            console.log("asd");
        }
    }
}