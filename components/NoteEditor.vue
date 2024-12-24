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
const title = ref();

const saveState = () => {
  history.push(new EditorMemento(JSON.parse(JSON.stringify(content.value))));
}

const getAvailableId = () => {
  if(content.value.todo.length == 0){
      return 1;
  }
    
  const max = Math.max(...content.value.todo.map((x: TodoItem) => x.id));
  return max + 1;
}

const handleCreate = (index: number) => {

  const empty = {
    id: getAvailableId(),
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

const handleTitleInput = () => {
  content.value.title = title.value.value;
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
  else if(e.ctrlKey && e.code == "Enter"){
    handleCreate(content.value.todo.length - 1);
  }
  else if(e.ctrlKey && e.code == "KeyS"){
    e.preventDefault(); 
    handleSave();
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
  title.value.value = props.title;
  title.value.focus();
  saveState();
  window.addEventListener('keydown', handleKeyboard)
});
onUnmounted(() => window.removeEventListener('keydown', handleKeyboard));
</script>

<template>
  <input 
    type="text"
    ref="title"
    class="focus:outline-none text-4xl md:text-5xl mb-8"
    @input="handleTitleInput"
    maxlength="20"
  >
  <br>

  <nav class="flex items-center justify-between flex-wrap gap-3">
    <div class="gap-3 flex select-none">
      <AppButton 
        severity="secondary"
        @click="handleBack"
      >
        <code>Ctrl+Z</code>
      </AppButton>
      <AppButton 
        severity="secondary"
        @click="handleForward"
      >
        <code>Ctrl+Shift+Z</code>
      </AppButton>
    </div>
  
    <div class="flex justify-end gap-3 select-none">
      <AppButton
        severity="secondary"
        @click="handleCancel"
      >
        Отмена
      </AppButton>
      <AppButton
        severity="success"
        @click="handleSave"
      >
        Сохранить
      </AppButton>
      <AppButton
        severity="danger"
        @click="handleDeleteNote"
      >
        Удалить
      </AppButton>
    </div>
  </nav>

  <br>

  <div 
    class="flex flex-col gap-3" 
    v-if="content.todo.length > 0"
  >
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
  <AppButton
    v-else
    severity="info"
    @click="handleCreate(content.todo.length - 1)"
  >
    Создать
  </AppButton>
</template>