<script setup lang="ts">
import { makeNote } from '~/models/Note';

const storage = useDbStore();
const router = useRouter();

const handleCreate = () => {
  const empty = makeNote(storage.getAvailableId(), "Название...", [])
  storage.addNote(empty);
  router.push({path: `/notes/${empty.id}`})
}
</script>

<template>
  <div>
    <nav class="mb-8 flex items-center gap-3 justify-between">
      <h1 class="text-3xl lg:text-5xl">Home page</h1>
      <AppButton severity="success" @click="handleCreate">Создать</AppButton>
    </nav>

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