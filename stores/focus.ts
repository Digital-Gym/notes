import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useMyFocusStore = defineStore('focus', ()=>{
  const focusedId = ref();

  const setFocus = (id: number) => {
    focusedId.value = id;
  }

  return {focusedId, setFocus}
});
