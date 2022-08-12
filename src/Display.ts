import { TasksList, SingleNote } from "./main"
import { Note } from "./SingleNote";
import { SaveAndLoad } from "./SaveAndLoad";

//Singleton Class
export class Display {
  private static instance: Display;

  private constructor () {}

  static getDisplay () {
    if (this.instance) return this.instance;

    this.instance = new Display();
    return this.instance;
  }

  private createNoteMainContainer (title: string, tasks: TasksList): HTMLDivElement {
    const noteMainContainer = document.createElement('div');
    noteMainContainer.className = `container flex-1 mx-2 my-2 md:max-w-md md:min-w-[250px]`;
    noteMainContainer.setAttribute("data-note", "note");

    //appends each element to create component
    noteMainContainer.appendChild(this.createNoteBackgroundContainer(title, tasks));

    return noteMainContainer;
  }

  private createNoteBackgroundContainer (title: string, tasks: TasksList): HTMLDivElement {
    //creates note background container
    const noteBackgroundContainer = document.createElement('div');
    noteBackgroundContainer.className = `pt-2 px-3 pb-2 flex flex-col rounded-md w-full bg-white relative`

    const noteDeleteButton = this.createNoteDeleteButton();
    //adds event listeners to note background container to show note delete button when hovering and hide while not
    noteBackgroundContainer.addEventListener('mouseover', () => noteDeleteButton.className = noteDeleteButton.className.replace("invisible", "visible"));
    noteBackgroundContainer.addEventListener('mouseleave', () => noteDeleteButton.className = noteDeleteButton.className.replace("visible", "invisible"));

    noteBackgroundContainer.append(noteDeleteButton, this.createNoteTitle(title), this.createNoteTasks(tasks), this.createNewNoteButton());

    return noteBackgroundContainer;
  }

  private createNoteDeleteButton (): HTMLAnchorElement {
    //creates note delete button
    const noteDeleteButton = document.createElement('a');
    noteDeleteButton.className = `invisible absolute flex justify-center items-center w-6 h-6 rounded-xl text-white text-xs font-semibold bg-gray-800 right-2 hover:bg-gray-600`;
    noteDeleteButton.href = '#';
    noteDeleteButton.innerHTML = `X`;
    noteDeleteButton.addEventListener("click", this.removeSingleNote.bind(this));

    return noteDeleteButton;
  }

  private createNoteTitle (title: string): HTMLDivElement {
    //creates note title
    const noteTitle = document.createElement('div');
    noteTitle.className = "text-lg justify-self-start font-bold mb-2 w-4/5";
    noteTitle.setAttribute("contentEditable", "true");
    noteTitle.innerHTML = `${title}`;
    noteTitle.addEventListener("focusout", SaveAndLoad.saveToCookies);
    noteTitle.addEventListener("keypress", (key) => {
      if (key.key === 'Enter') {
        noteTitle.blur(); //blur removes keyboard focus from the element
      }
    })

    return noteTitle;

  }

  private createNoteTasks (tasks: TasksList): HTMLDivElement {
    //creates notes tasks container
    const noteTasksContainer = document.createElement('div');
    noteTasksContainer.className = `flex flex-col space-y-2`;
    if (tasks) {
      tasks.forEach((task) => {
        const singleTask = `
          <div>
            <input type="checkbox" ${task[1] ? "checked" : ""}>
            <label>${task[0]}</label>
          </div>`;
          noteTasksContainer.innerHTML += singleTask;
      })
    }

    return noteTasksContainer;
  }

  private createNewNoteButton (): HTMLAnchorElement {
    //creates add new task button
    const newNoteButton = document.createElement('a');
    newNoteButton.className = `justify-self-center self-center flex justify-center items-end text-2xl text-green-500 font-semibold right-2`;
    newNoteButton.href = "#"
    newNoteButton.innerHTML = `<i class="fa-solid fa-list-check"></i>`;
    newNoteButton.addEventListener("click", this.addNewTask.bind(this));

    return newNoteButton;
  }

  private addNewTaskLabel (element: HTMLAnchorElement, notesContainer: HTMLDivElement): HTMLDivElement {
    const taskLabel = document.createElement("div")
    taskLabel.setAttribute("contenteditable", "true");
    taskLabel.className = "w-5/6"

    taskLabel.addEventListener("keydown", (key) => {
      if (key.key === 'Enter') {
        key.preventDefault();
        taskLabel.blur();
        if (!taskLabel.innerHTML) {
          const emptyTask =  notesContainer.lastChild;
          if(!!emptyTask) {
            notesContainer.removeChild(emptyTask);
          }
          return;
        }
        element.click();
      }
    })

    return taskLabel;
  }

  private addNewTaskInput (taskName: string): HTMLInputElement {
    const taskInput = document.createElement("input");
    taskInput.setAttribute("type", "checkbox");
    taskInput.setAttribute("name", taskName)
    taskInput.className = "mt-1"

    return taskInput;
  }

  private addSingleNewTaskContainer (element: HTMLAnchorElement, notesContainer: HTMLDivElement): [HTMLDivElement, HTMLDivElement]  {
    const task = document.createElement("div");
    task.className = "flex space-x-3"

    const taskName = Date.now().toString();

    const taskLabel = this.addNewTaskLabel(element, notesContainer);

    task.append(this.addNewTaskInput(taskName), taskLabel);

    return [task, taskLabel];
  }

  private addNewTask (element?: any): void {
    console.log("addNewTask");
    //const noteTasksContainer: HTMLDivElement = element.target.previousSibling;
    const noteTasksContainer: HTMLDivElement = element.path[2].childNodes[2]; //needs to be changed, it's too boilerplated
    console.log(element.path[2].childNodes[2]);

    const [taskContainer, taskLabel] = this.addSingleNewTaskContainer(element.target, noteTasksContainer);
    noteTasksContainer.appendChild(taskContainer);
    taskLabel.focus();

    SaveAndLoad.saveToCookies();
  }


  displaySingleNote(content: SingleNote): void {
    //gets section container of specific category
    const sectionNotesContainer = document.getElementById(`notes-container-${content.category}`);

    if (sectionNotesContainer) sectionNotesContainer.appendChild(this.createNoteMainContainer(content.title, content.tasks || []));
  }

  removeSingleNote(note: any):void {
    note.path[2].remove();
    SaveAndLoad.saveToCookies();
  }

  displayCategory(category: string) {
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded.split('; ');
    let categoryNotes = cArr.find(category => {
      return category.includes("notes")
    });

    if (!!categoryNotes) {
      const parsed: SingleNote [] = JSON.parse(categoryNotes!.slice(6));
      parsed.forEach(note => this.displaySingleNote(note))
    }
  }
  

}