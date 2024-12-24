<script lang="ts" setup>
import type { TodoItemExtra } from '~/models/TodoItem';
import { onMounted, onUnmounted, watchEffect, watch} from 'vue';
import { useMyFocusStore } from '~/stores/focus';

const props = defineProps<TodoItemExtra>();
const emit = defineEmits(['change', 'delete', 'status', 'create']);
const focus = useMyFocusStore();
const status = ref();
const task = ref();

const handleStatus = () => {
  status.value = !status.value;
  emit('status', props.id, status.value);
}

const handleDelete = () => {
  task.value.removeEventListener("keydown", createRequest);
  emit('delete', props.id);
}

const handleInput = () => {
  focus.setFocus(props.id);
  emit('change', props.id, task.value.value);
}

const handleFocusClick = () => {
  if (task.value) {
    task.value.focus();
  }
}

watchEffect(()=>{
  if(props.id == focus.focusedId){
    handleFocusClick();
  }
});

watch(() => props.status, ()=>{
  status.value = props.status;
});

const createRequest = (e: KeyboardEvent) => {
  if(e.code==="Enter" && task.value.value != ''){
    if(e.ctrlKey){
      return;
    }
    emit("create", props.order);
    return;
  }
  
  // mobile
  else if(e.keyCode==13 && task.value.value != ''){
    emit("create", props.order);
  }
}

const focusOnEmpty = () =>{
  if(props.task == ""){
    task.value.focus();
  }
}

onMounted(()=>{
  task.value.value = props.task;
  status.value = props.status;
  task.value.addEventListener("keydown", createRequest);
  focusOnEmpty();
});

onUnmounted(()=>{
  if(task.value){
    task.value.removeEventListener("keydown", createRequest);
  }
});
</script>
<template>
  <div 
    class="border-b flex gap-3 justify-between px-6 py-5"
    @click.self="handleFocusClick"
  >
    <div class="flex items-center gap-3">
      <input 
        type="checkbox" 
        v-model="status"
        @click.stop="handleStatus"
      />

      <input 
        type="text"
        ref="task"
        @input="handleInput"
        :class="{
          'line-through': status,
        }"
        class="focus:outline-none"
      >
    </div>

    <div class="
    z-10 w-7 h-7 top-4 right-4 hover:text-red-500 rounded-full
    flex items-center justify-center hover:bg-slate-50 text-slate-400
    transition
    "
    @click.stop="handleDelete"
    >
      <IconsCrossIcon />
    </div>

  </div>
</template>

<style>

</style>