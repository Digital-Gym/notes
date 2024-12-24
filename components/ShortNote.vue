<script lang="ts" setup>
import type { Note } from '~/models/Note';

const N = 3;

const props = defineProps<Note>();
const todos = props.todo.slice(0, N);
const storage = useDbStore();
const router = useRouter();
const isOpen = ref(false);

const handleDelete = () => {
  isOpen.value = true;
}

const manualRoute = () => {
  router.push({path: `notes/${props.id}`})
}

const handleReject = () => {
  isOpen.value = false;
}

const handleAccept = () => {
  isOpen.value = false;
  storage.deleteNote(props.id);
}
</script>

<template>
  <ConfirmDialog 
    :is-open="isOpen"
    text="Вы уверены?"
    @reject="handleReject"
    @accept="handleAccept"
  />
  <div 
    class="
      hover:before:block
      before:absolute before:w-full before:h-full before:bg-slate-300
      before:hidden before:z-10 before:opacity-10
      relative border rounded-md
      "
    @click.self="manualRoute"
  >

  <!-- delete button -->
  <div 
    class="
    z-10 w-7 h-7 absolute top-4 right-4 hover:bg-red-500 bg-slate-200 rounded-md
    flex items-center justify-center hover:text-slate-100 text-slate-400
    transiton
    "
    @click.stop="handleDelete"
  >
    <IconsTrashIcon />
  </div>

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
  
            <p 
              type="text"
              :class="{
                'line-through': item.status,
              }"
              class="focus:outline-none"
            >
              {{ item.task }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute bottom-0 left-0 w-full h-2/4 bg-gradient-to-b from-transparent to-white pointer-events-none rounded-lg"></div>
  </div>
</template>