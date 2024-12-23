<script setup lang="ts">
// import { makeNote } from "~/models/Note";
import type { TodoItem } from "~/models/TodoItem";

// const storage = useDbStore();
// const smth: Note = makeNote(0, "Banana", []);
// storage.write([smth]);
const todos: TodoItems[] = [
  {id: 0, task: "Eat banana", status: false},
  {id: 1, task: "Go to gym", status: true},
  {id: 2, task: "Have a nice day", status: false},
  {id: 3, task: "Complete project", status: true}
]

</script>

<template>
  <NoteEditor
    :id="0"
    title="Note#1"
    :todo="todos"
  />
</template>