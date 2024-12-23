<script setup lang="ts">
import { makeNote } from "~/models/Note";
import type { TodoItem } from "~/models/TodoItem";

const todos: TodoItem[] = [
  {id: 0, task: "Eat banana", status: false},
  {id: 1, task: "Go to gym", status: true},
  {id: 2, task: "Have a nice day", status: false},
  {id: 3, task: "Complete project", status: true}
]

const db = useDbStore();
const note = makeNote(db.db.length, `Note #${db.db.length}`, todos);
db.addNote(note);
</script>

<template>
  <NoteEditor
    :id="note.id"
    :title="note.title"
    :todo="note.todo"
  />
</template>