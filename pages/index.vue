<script setup lang="ts">
import { makeNote } from '~/models/Note';

const storage = useDbStore();
const router = useRouter();

const handleCreate = () => {
  const empty = makeNote(storage.getAvailableId(), "Ваше название...", [])
  storage.addNote(empty);
  router.push({path: `/notes/${empty.id}`})
}
</script>

<template>
  <div>
    <nav class="flex justify-between items-center">
      <h1 class="text-3xl lg:text-5xl mb-8">Home page</h1>
      <AppButton severity="success" class="w-20" @click="handleCreate">Add</AppButton>
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