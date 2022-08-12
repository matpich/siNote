import { SingleNote } from "./main";
import { TasksList } from "./main";

export class ParseDOMString {
    static domToString (): string {
        const categoryNotes: SingleNote [] = [];
        const notes: NodeList = document.querySelectorAll('*[data-note="note"]');

        notes.forEach((note)   => {
            const noteToSave: SingleNote = {
                category: "main",
                title: (note as HTMLDivElement).dataset.title as string,
                tasks: []
            }
            note.childNodes[1].childNodes.forEach(el => {
                //ignores text nodes
                if (el.nodeType === 1 && (el as HTMLElement).hasAttribute("data-type")) {
                    el.childNodes.forEach(item => {
                        if(item.nodeType === 1) {
                            if ((item as HTMLDivElement).dataset.type === "task") {
                                let inputElement: HTMLInputElement = (item as HTMLDivElement).childNodes[1] as HTMLInputElement;
                                let labelElement: HTMLLabelElement = (item as HTMLDivElement).childNodes[3] as HTMLLabelElement;
                                noteToSave.tasks.push(["task", labelElement.textContent || '', inputElement.checked])
                            } else if ((item as HTMLDivElement).dataset.type === "text") {
                                let divElement: HTMLDivElement = item as HTMLDivElement;
                                noteToSave.tasks.push(["text", divElement.innerText]);
                            }
                        }
                    })
                }
            });
            categoryNotes.push(noteToSave);
        })
        return JSON.stringify(categoryNotes);
    }
}