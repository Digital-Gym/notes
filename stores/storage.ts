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
  
  return { db, write }
});