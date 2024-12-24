import type { Note } from "~/models/Note";
import { defineStore } from 'pinia'
import { ref } from 'vue';
import type { Ref } from "vue";

const NAME = 'notesdb78';

function init(): Note[]{
  const storage = localStorage.getItem(NAME);
  let val: Note[] = [];

  if(storage){
    val = JSON.parse(storage);
  }

  return val;
}

function writeToStorage(content: Note[]){
  localStorage.setItem(NAME, JSON.stringify(content));
}

export const useDbStore = defineStore('storage', () => {
  const db: Ref<Note[]> = ref(init());

  function write(content: Note[]){
    db.value = content;
    writeToStorage(content);
  }

  function updateNote(note: Note): boolean {
    for(let i = 0; i<db.value.length;i++){
      if(db.value[i].id == note.id){
        db.value[i] = note;
        writeToStorage(db.value);
        return true;
      }
    }

    return false;
  }

  function deleteNote(id: number){
    db.value = db.value.filter(x=>x.id != id);
    writeToStorage(db.value);
  }

  function addNote(note: Note){
    db.value.push(note);
    writeToStorage(db.value);
  }
  
  function getAvailableId(){
    if(db.value.length == 0){
      return 1;
    }
    
    const max = Math.max(...db.value.map(x=>x.id));
    return max + 1;
  }

  return { db, write, updateNote, deleteNote, addNote, getAvailableId }
});