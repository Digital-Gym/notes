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
  if(e.code == "Enter" && task.value.value != ''){
    emit("create", props.order);
    return;
  }
}

const focusOnEmpty = () =>{
  if(props.task == ""){
    task.value.focus();
  }
}

onMounted(()=>{
  console.log("hey");
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
    class="border w-2/5 flex gap-3 justify-between p-3 rounded"
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

    <div 
      class="border rounded-full w-7 h-7 text-center select-none cursor-pointer"
      @click.stop="handleDelete"
    >
      x
    </div>
  </div>
</template>

<style>

</style>