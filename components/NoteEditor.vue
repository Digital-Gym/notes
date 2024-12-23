<script setup lang="ts">
import type { Note } from '~/models/Note';

const props = defineProps<Note>();
const todos = ref(props.todo);

const handleCreate = (index) => {  
  const empty = {
    id: todos.value.length,
    task: "",
    status: false
  }

  todos.value.splice(index + 1, 0, empty);
}
</script>

<template>
  <h1 class="text-5xl">
    {{ props.title }}
  </h1>
  <br>

  <div class="flex flex-col gap-3">
    <TodoItem 
      v-for="(item, index) in todos"
      :key="item.id"
      :id="item.id"
      :task="item.task"
      :status="item.status"
      @create="handleCreate"
      :order="index"
    />
  </div>
</template>