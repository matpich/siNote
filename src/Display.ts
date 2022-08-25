import { TasksList, SingleNote } from "./main"
import { Note } from "./Note";
import { SaveAndLoad } from "./SaveAndLoad";

type NoteControlType = {
  size: string;
  color: string; 
  symbol: string
}


//Singleton Class
export class Display {
  private static instance: Display;

  private constructor () {}

  static getDisplay () {
    if (this.instance) return this.instance;

    this.instance = new Display();
    return this.instance;
  }

  private createNoteMainContainer (note: Note): HTMLDivElement {
    const noteMainContainer = document.createElement('div');
    noteMainContainer.className = `container flex-2 mx-2 my-2 md:max-w-md md:min-w-[250px]`;
    noteMainContainer.setAttribute("data-note", "note");
    noteMainContainer.setAttribute("id", note.id!.toString());

    noteMainContainer.appendChild(this.createNoteBackgroundContainer(note));

    return noteMainContainer;
  }

  private createNoteBackgroundContainer (note: Note): HTMLDivElement {
    //creates note background container
    const noteBackgroundContainer = document.createElement('div');
    noteBackgroundContainer.className = `pt-2 px-3 pb-2 flex flex-col rounded-md w-full bg-white relative`

    const noteDeleteButton = this.createNoteDeleteButton(note);
    //adds event listeners to note background container to show note delete button when hovering and hide while not
    noteBackgroundContainer.addEventListener('mouseover', () => noteDeleteButton.className = noteDeleteButton.className.replace("invisible", "visible"));
    noteBackgroundContainer.addEventListener('mouseleave', () => noteDeleteButton.className = noteDeleteButton.className.replace("visible", "invisible"));

    noteBackgroundContainer.append(noteDeleteButton, this.createNoteTitle(note), this.createNoteTasks(note), this.createNoteControlSection(note));

    return noteBackgroundContainer;
  }

  private createNoteDeleteButton (note: Note): HTMLAnchorElement {
    //creates note delete button
    const noteDeleteButton = document.createElement('a');
    noteDeleteButton.className = `invisible absolute flex justify-center items-center w-6 h-6 rounded-xl text-white text-xs font-semibold bg-gray-800 right-2 hover:bg-gray-600`;
    noteDeleteButton.href = '#';
    noteDeleteButton.innerHTML = `X`;
    noteDeleteButton.dataset.id = note.id!.toString();
    noteDeleteButton.addEventListener("click", note.deleteNote);

    return noteDeleteButton;
  }

  private createNoteTitle (note: Note): HTMLDivElement {
    //creates note title
    const noteTitle = document.createElement('div');
    noteTitle.className = "text-lg justify-self-start font-bold mb-2 w-4/5";
    noteTitle.setAttribute("contentEditable", "true");
    noteTitle.setAttribute("data-type", "title");
    noteTitle.innerText = `${note.title}`;
    noteTitle.addEventListener("focusout", SaveAndLoad.saveToCookies);
    noteTitle.addEventListener("keypress", note.blurElement)

    return noteTitle;

  }

  private createNoteTasks (note: Note): HTMLDivElement {
    //creates notes tasks container
    const noteTasksContainer = document.createElement('div');
    noteTasksContainer.setAttribute("data-contentContainerId", `${note.id}`)
    noteTasksContainer.className = `flex flex-col space-y-2`;
    if (note.tasks) {
      note.tasks.forEach((task) => {
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

  private createNoteControlSection (note: Note): HTMLDivElement {
    const noteControlSection  = document.createElement("div");
    noteControlSection.className = "flex space-x-6 justify-center mt-4";
    noteControlSection.setAttribute("data-noteControlSectionId", `${note.id}`)

    noteControlSection.append(
      this.createNoteControlButton({size: "text-2xl", color: "text-green-500", symbol: "fa-list-check"}, note),
      this.createNoteControlButton({size: "text-xl", color: "text-gray-500", symbol: "fa-align-justify"}, note),
      this.createNoteControlButton({size: "text-xl", color: "text-red-500", symbol: "fa-heading"}, note),
    )

    return noteControlSection;
  }

  private createNoteControlButton (control: NoteControlType, note: Note): HTMLAnchorElement {
    //creates add new task button
    const controlButton = document.createElement('a');
    controlButton.className = `justify-self-center self-center flex justify-center items-end ${control.size} ${control.color} font-semibold right-2`;
    controlButton.href = "javascript:void(0)"
    controlButton.innerHTML = `<i class="fa-solid ${control.symbol}"></i>`;
    //controlButton.addEventListener("click", this.addNewTask.bind(this));
    controlButton.addEventListener("click", (event) => note.newTask(event, note.id.toString()));

    return controlButton;
  }

  addTaskDeleteButton (): HTMLAnchorElement {
    const taskDeleteButton = document.createElement('a');
    taskDeleteButton.className = `invisible flex justify-center items-center w-5 h-5 rounded-md text-white text-xs font-semibold bg-red-600 hover:bg-red-400`;
    taskDeleteButton.href = "javascript:void(0)";
    taskDeleteButton.innerText = "X";

    return taskDeleteButton;
  }

  addNewTaskContainer (): HTMLDivElement {
    const task = document.createElement("div");
    task.className = "flex space-x-3"
    task.setAttribute("data-type", "task")
    return task;
  }

  addNewTaskTextField (): HTMLDivElement {
    const taskLabel = document.createElement("div")
    taskLabel.setAttribute("contenteditable", "true");
    taskLabel.className = "w-5/6 cursor-auto"

    return taskLabel;
  }
  
  addNewTaskInput (): HTMLInputElement {
    const taskInput = document.createElement("input");
    taskInput.setAttribute("type", "checkbox");
    taskInput.className = "mt-1"

    return taskInput;
  }



  displaySingleNote(note: Note): void {
    const sectionNotesContainer = document.getElementById(`notes-container`);

    if (sectionNotesContainer) sectionNotesContainer.appendChild(this.createNoteMainContainer(note));
  }

  removeSingleNote(note: any):void {
    note.path[2].remove();
    SaveAndLoad.saveToCookies();
  }

  // displayCategory(category: string) {
  //   const cDecoded = decodeURIComponent(document.cookie); //to be careful
  //   const cArr = cDecoded.split('; ');
  //   let categoryNotes = cArr.find(category => {
  //     return category.includes("notes")
  //   });

  //   if (!!categoryNotes) {
  //     const parsed: SingleNote [] = JSON.parse(categoryNotes!.slice(6));
  //     parsed.forEach(note => this.displaySingleNote(new Note(note.category, note.title, note.tasks)))
  //   }
  // }
  

}