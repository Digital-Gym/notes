<script setup lang="ts">
import type { Note } from '~/models/Note';
import { EditorHistory, EditorMemento } from '~/services/NoteService';
import type { TodoItem } from '~/models/TodoItem';
import { useMyFocusStore } from '~/stores/focus';
import { useDbStore } from '~/stores/storage';

const props = defineProps<Note>();
const focus = useMyFocusStore();

const router = useRouter();
const db = useDbStore();
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
      return;
    }
  });
  saveState();
}

const handleInput = (id: number, task: string) => {
  content.value.todo.forEach((item: TodoItem)=>{
    if(item.id == id){
      item.task = task;
      return;
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
  if(e.ctrlKey && e.shiftKey && e.code === 'KeyZ'){
    handleForward();
  }
  else if(e.ctrlKey && e.code === 'KeyZ'){
    handleBack();
  } 
}

const handleSave = () => {
  db.updateNote(content.value);
  console.log("Changes has been saved");
}

const handleDeleteNote = () => {
   // todo: confirmation dialog
  db.deleteNote(content.value.id);
  router.push({path: '/'});
  console.log("Deleted");
}

const handleCancel = () => {
  // todo: confirmation dialog
  router.push({path: '/'});
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

  <div class="flex justify-end gap-3 select-none">
    <div class="border p-3 hover:border-gray-700" @click="handleCancel">Cancel</div>
    <div class="border p-3 hover:border-green-700" @click="handleSave">Save</div>
    <div class="border p-3 hover:border-red-700" @click="handleDeleteNote">Delete</div>
  </div>

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