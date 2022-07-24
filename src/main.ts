import { Note } from "./SingleNote";


document.querySelector('#new-note')?.addEventListener('click', ()=> {
    const asd = new Note('Dupa');
    asd.newNote();
})