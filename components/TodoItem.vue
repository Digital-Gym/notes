<script lang="ts" setup>
import type { TodoItemWithOrder } from '~/models/TodoItem';
import { onMounted, onUnmounted } from 'vue';

const props = defineProps<TodoItemWithOrder>();
const emit = defineEmits(['change', 'delete', 'status', 'create']);
const status = ref();
const task = ref();

const handleStatus = () => {
  emit('status', status);
}

const handleDelete = () => {
  emit('delete');
}

const handleInput = () => {
  emit('change', task);
}

const handleFocusClick = (e) => {
  if (task.value) {
    task.value.focus();
  }
}

const createRequest = (e) => {
  if(e.code == "Enter"){
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
  task.value.value = props.task;
  task.value.addEventListener("keydown", createRequest);
  focusOnEmpty();
})

onUnmounted(()=>{
  task.value.removeEventListener("keydown", createRequest);
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
      class="border rounded-full w-7 h-7 text-center"
      @click.stop="handleDelete"
    >
      x
    </div>
  </div>
</template>

<style>

</style>