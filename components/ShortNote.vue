<script lang="ts" setup>
import type { Note } from '~/models/Note';

const N = 3;

const props = defineProps<Note>();
const todos = props.todo.slice(0, N);
</script>

<template>
  <NuxtLink 
    class="relative border rounded"
    :to="`notes/${props.id}`"
  >
    <div class="z-10 absolute bg-slate-400 w-full h-full opacity-0 hover:opacity-5"></div>

    <!-- content -->
    <div class="p-5">
      <h3 class="text-xl mb-3">{{ props.title }}</h3>
  
      <div>
        <div 
          class="flex gap-3 justify-between p-3"
          v-for="item in todos"
          :key="item.id"
        >
          <div class="flex items-center gap-3">
            <input 
              type="checkbox" 
              v-model="item.status"
              readonly
            />
  
            <input 
              type="text"
              :value="item.task"
              :class="{
                'line-through': item.status,
              }"
              class="focus:outline-none"
              readonly
            >
          </div>
        </div>
      </div>
    </div>

    <div class="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-b from-transparent to-white pointer-events-none"></div>
  </NuxtLink>
</template>