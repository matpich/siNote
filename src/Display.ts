import { SingleNote } from "./main"

//Singleton Class
export class Display {
  private static instance: Display;

  private constructor () {}

  static getDisplay () {
    if (this.instance) return this.instance;

    this.instance = new Display();
    return this.instance;
  }

  displaySingleNote(content: SingleNote): void {

    //gets section container of specific category
    const sectionNotesContainer = document.getElementById(`notes-container-${content.category}`);

    //creates note main container
    const noteMainContainer = document.createElement('div');
    noteMainContainer.className = `container flex-1 mx-2 my-2 md:max-w-md md:min-w-[250px]`;

    //creates note background container
    const noteBackgroundContainer = document.createElement('div');
    noteBackgroundContainer.className = `pt-2 px-3 pb-2 flex flex-col rounded-md w-full bg-white relative`

    //creates note delete button
    const noteDeleteButton = document.createElement('a');
    noteDeleteButton.className = `invisible absolute flex justify-center items-center w-6 h-6 rounded-xl text-white text-xs font-semibold bg-gray-800 right-2 hover:bg-gray-600`;
    noteDeleteButton.href = '#';
    noteDeleteButton.innerHTML = `X`;

    //creates note title
    const noteTitle = document.createElement('div');
    noteTitle.innerHTML = `<h1 class="text-lg font-bold mb-2">${content.title}</h1>`

    //creates notes tasks container
    const noteTasksContainer = document.createElement('div');
    noteTasksContainer.className = `flex flex-col space-y-2`
    content.tasks.forEach((task) => {
      const singleTask = `
        <div>
          <input type="checkbox" ${task[1] ? "checked" : ""}>
          <label>${task[0]}</label>
        </div>`;
        noteTasksContainer.innerHTML += singleTask;
    })

    //creates add new task button
    const addNewNoteButton = document.createElement('a');
    addNewNoteButton.className = `justify-self-center self-center flex justify-center items-end w-8 h-8 text-3xl rounded-full mt-4 text-white font-semibold bg-green-500 right-2`;
    addNewNoteButton.href = "#"
    addNewNoteButton.innerHTML = "+";

    //appends each element to create component
    noteBackgroundContainer.append(noteDeleteButton, noteTitle, noteTasksContainer, addNewNoteButton);
    noteMainContainer.appendChild(noteBackgroundContainer);

    //adds event listeners to note background container to show note delete button when hovering and hide while not
    noteBackgroundContainer.addEventListener('mouseover', () => noteDeleteButton.className = noteDeleteButton.className.replace("invisible", "visible"));
    noteBackgroundContainer.addEventListener('mouseleave', () => noteDeleteButton.className = noteDeleteButton.className.replace("visible", "invisible"));

    //appends note component to category section
    if (sectionNotesContainer) sectionNotesContainer.appendChild(noteMainContainer);
  }

  displayCategory(category: string) {
    this.displaySingleNote(this.fetchNotes()[0])
  }

  fetchNotes () {
    return JSON.parse(localStorage.getItem("notes")!);
  }
}