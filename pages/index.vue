<script setup lang="ts">
import type { TodoItem } from "~/models/TodoItem";

const todos: TodoItem[] = [
  {id: 0, task: "Eat banana", status: false},
  {id: 1, task: "Go to gym", status: true},
  {id: 2, task: "Have a nice day", status: false},
  {id: 3, task: "Complete project", status: true}
]

const storage = useDbStore();

</script>

<template>
  <div>
    <h1 class="text-5xl mb-8">Home page</h1>

    <div class="flex flex-col gap-8">
      <ShortNote 
        v-for="note in storage.db"
        :key="note.id"
        :id="note.id"
        :title="note.title"
        :todo="note.todo"
      />
    </div>
  </div>
</template>