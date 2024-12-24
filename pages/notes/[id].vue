<script lang="ts" setup>

const route = useRoute()
const db = useDbStore();
const note = db.db.filter(x => x.id == Number(route.params.id))[0];
</script>

<template>
  <div>
    <NoteEditor
      :id="note.id"
      :title="note.title"
      :todo="note.todo"
    />
  </div>
</template>