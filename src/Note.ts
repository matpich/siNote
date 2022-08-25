import { SingleNote, display } from "./main";
import { SaveAndLoad } from "./SaveAndLoad"

interface NoteCreator extends SingleNote {
    newNote: () => void;
    deleteNote: (el: any) => void;
    newTask: (ievent: any, id: string, sibling?: HTMLDivElement) => Function;
    newParagraph: () => void;
    newHeading: () => void;
    deleteTask: () => void;
    blurElement: (event: any) => void;
    deleteButtonShowOrHide: (event: any) => void
}

export class Note implements NoteCreator {
    constructor (public category: string, public title: string, public tasks: ["text" | "task", string, boolean?] [], public id: number) {}

    newNote() {   
        console.log(this)
        display.displaySingleNote(this);
        SaveAndLoad.saveToCookies();
    }

    deleteNote(el: any) {
        console.log(this)
        const note = document.getElementById(`${el.target.dataset.id}`);
        note?.remove();
    }

    newTask(event: any, id: string, sibling?: HTMLDivElement) {
        const contentContainer = document.querySelector(`*[data-contentcontainerid="${id}"`);            
        if (event.target.className.includes("fa-list-check")) {
            const taskContainer = display.addNewTaskContainer();
            const taskTextInputField = display.addNewTaskTextField();
            const taskInputCheckBox = display.addNewTaskInput();
            const taskDeleteButton = display.addTaskDeleteButton();
            taskContainer.append(taskInputCheckBox, taskTextInputField, taskDeleteButton);

            if (sibling) {
                sibling.after(taskContainer);
            } else if (contentContainer) {
                contentContainer.append(taskContainer);
            }

            taskTextInputField.focus();

            taskContainer.addEventListener("mouseenter", ()=> taskDeleteButton.className = taskDeleteButton.className.replace("invisible","visible"));
            taskContainer.addEventListener("mouseleave", ()=> taskDeleteButton.className = taskDeleteButton.className.replace("visible","invisible"));

            taskDeleteButton.addEventListener("click", (clickEvent) => {
                (clickEvent.target as HTMLAnchorElement).parentElement?.remove();
            })

            taskTextInputField.addEventListener("keydown", (key) => {
                if (key.key === "Enter") {
                    key.preventDefault();
                    taskTextInputField.blur();
                    if (!taskTextInputField.innerText) {
                        taskDeleteButton.click();
                        return;
                    }
                    this.newTask(event, id, taskContainer);
                    //event.target.click();
                }

                if (key.key === "Escape") {
                    taskTextInputField.blur();
                }
            })

            taskTextInputField.addEventListener("focusout", () => {
                if (!taskTextInputField.innerText) {
                    taskDeleteButton.click();
                }
            })
        } 
        
        if (event.target.className.includes("fa-align-justify")) {
            console.log('teksty');
        } 
        
        if (event.target.className.includes("fa-heading")) {
            console.log('hedingi')
        }
        return () => {};
    }

    newParagraph() {
        console.log(this.newParagraph);
    }

    newHeading() {
        console.log(this.newHeading);
    }

    deleteTask() {
        console.log(this.deleteNote);
    }

    deleteButtonShowOrHide (event: any) {
        console.log(event.target);
    }

    blurElement (event: any) {
            if (event.key === 'Enter') {
              event.target.blur(); //blur removes keyboard focus from the element
            }
          }
}