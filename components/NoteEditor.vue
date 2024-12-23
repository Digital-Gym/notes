<script setup lang="ts">
import type { Note } from '~/models/Note';
import { EditorHistory, EditorMemento } from '~/services/NoteService';
import type { TodoItem } from '~/models/TodoItem';
import { useMyFocusStore } from '~/stores/focus';

const props = defineProps<Note>();
const focus = useMyFocusStore();

const content = ref(JSON.parse(JSON.stringify(props)));
const history = new EditorHistory();

const saveState = () => {
  history.push(new EditorMemento(JSON.parse(JSON.stringify(content.value))));
}

const handleCreate = (index: number) => {  
  const empty = {
    id: content.value.todo.length,
    task: "",
    status: false
  } as TodoItem;

  content.value.todo.splice(index + 1, 0, empty);
  focus.setFocus(empty.id);
  saveState();
}

const handleDelete = (id: number) => {
  content.value.todo = content.value.todo.filter((x: TodoItem)=>x.id != id);
  focus.focusedId = focus.focusedId - 1;
  saveState();
}

const handleStatus = (id: number, status: boolean) => {

  content.value.todo.forEach((item: TodoItem)=>{
    if(item.id == id){
      item.status = status;
    }
  });
  saveState();
}

const handleInput = (id: number, task: string) => {
  content.value.todo.forEach((item: TodoItem)=>{
    if(item.id == id){
      item.task = task;
    }
  });

  saveState();
}

const handleBack = () => {
  const previousState = history.pop();

  if (previousState){
    content.value = previousState.getContent();
  }
}

const handleForward = () => {
  const previousState = history.undoPop();

  if (previousState){
    content.value = previousState.getContent();
  }
}

const handleKeyboard = (e: KeyboardEvent) => {
  if(e.ctrlKey && e.key == 'z'){
    handleBack();
  } 
  else if(e.ctrlKey && e.shiftKey && e.key == 'z'){
    handleForward();
  }
}

onMounted(() => {
  saveState();
  window.addEventListener('keydown', handleKeyboard)
});
onUnmounted(() => window.removeEventListener('keydown', handleKeyboard));
</script>

<template>
  <h1 class="text-5xl">
    {{ props.title }}
  </h1>
  <br>

  <div class="flex flex-col gap-3">
    <TodoItem 
      v-for="(item, index) in content.todo"
      :key="`${item.id}-${item.task}`"
      :id="item.id"
      :task="item.task"
      :status="item.status"
      :order="index"
      @create="handleCreate"
      @delete="handleDelete"
      @status="handleStatus"
      @change="handleInput"
    />
  </div>

  <div class="mt-4 ml-4 gap-3 flex select-none">
    <div class="border p-3 hover:border-red-700" @click="handleBack">Back</div>
    <div class="border p-3 hover:border-red-700" @click="handleForward">Next</div>
  </div>
</template>