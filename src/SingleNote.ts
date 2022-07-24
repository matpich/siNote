interface SingleNote {
    title: string;
    tasks: HTMLDivElement[];
    newNote: () => string;
    newTask:(task: string) => void;
}

export class Note implements SingleNote {
    constructor(public title: string, public tasks: HTMLDivElement [] = []) {}

    newNote (): string {
        const notesContainer = document.getElementById('notes-container');
        const noteHtml = `
        <div class="container flex-1 mx-2 my-2 md:max-w-md md:min-w-[250px]">
            <div class="pt-2 px-3 pb-2 flex flex-col rounded-md w-full bg-white relative">
                <a  href="#" class="absolute flex justify-center items-center w-6 h-6 rounded-xl text-white text-xs font-semibold bg-gray-800 right-2">X</a>
                <div>
                    <h1 class="text-lg font-bold mb-2"></h1>
                </div>
                <div id="tasks-container" class="flex flex-col space-y-2">

                </div>
                <a  href="#" class="justify-self-center self-center flex justify-center items-end w-8 h-8 text-3xl rounded-full mt-4 text-white font-semibold bg-green-500 right-2"><div>+</div></a>
            </div>
        </div>
        `;
        if (notesContainer) notesContainer.innerHTML += noteHtml;
        return 'asd';
    }

    newTask (task:string): void {

    }

}