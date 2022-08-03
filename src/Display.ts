import { TasksList, SingleNote } from "./main"
import { Note } from "./SingleNote";

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
    noteTitle.addEventListener("focusout", this.saveToCookies);
    noteTitle.addEventListener("keypress", (key) => {
      if (key.key === 'Enter') {
        noteTitle.blur(); //blur removes keyboard focus from the element
      }
    })

    return noteTitle;

  }

  private createNoteTasks (tasks: TasksList): HTMLDivElement {
    //creates notes tasks container
    const noteTasks = document.createElement('div');
    noteTasks.className = `flex flex-col space-y-2`;
    if (tasks) {
      tasks.forEach((task) => {
        const singleTask = `
          <div>
            <input type="checkbox" ${task[1] ? "checked" : ""}>
            <label>${task[0]}</label>
          </div>`;
          noteTasks.innerHTML += singleTask;
      })
    }

    return noteTasks;
  }

  private createNewNoteButton (): HTMLAnchorElement {
    //creates add new task button
    const newNoteButton = document.createElement('a');
    newNoteButton.className = `justify-self-center self-center flex justify-center items-end w-8 h-8 text-3xl rounded-full mt-4 text-white font-semibold bg-green-500 right-2`;
    newNoteButton.href = "#"
    newNoteButton.innerHTML = "+";

    return newNoteButton;
  }


  displaySingleNote(content: SingleNote): void {
    //gets section container of specific category
    const sectionNotesContainer = document.getElementById(`notes-container-${content.category}`);





    //appends note component to category section
    if (sectionNotesContainer) sectionNotesContainer.appendChild(this.createNoteMainContainer(content.title, content.tasks || []));
  }

  removeSingleNote(note: any):void {
    note.path[2].remove();
    this.saveToCookies();
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
  
  saveToCookies(): void {
    const categoryNotes: SingleNote [] = [];
    const notes = document.querySelectorAll('*[data-note="note"]') ;

    notes.forEach((note)   => {
      categoryNotes.push(
            {
                category: "main",
                title: note.firstChild?.childNodes[1].textContent || "Title Loading Error",
                tasks: JSON.parse((note as HTMLDivElement).dataset.tasks || "[]") || []
            }
        )
    })
    console.log(categoryNotes);    document.cookie = `notes=${JSON.stringify(categoryNotes)}`;
  }
}