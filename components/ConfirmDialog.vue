<script lang="ts" setup>
const props = defineProps({
  isOpen: {
    required: true,
    type: Boolean
  },
  text: {
    required: true,
    type: String
  }
});

const emit = defineEmits(['reject', 'accept']);

const dialog = ref();

const handleClose = () => {
  dialog.value.close();
  emit('reject');
}

const hanldeAccept = () => {
  dialog.value.close();
  emit('accept');
}

onMounted(()=>{
  if(props.isOpen){
    dialog.value.showModal();
  }
})

watch(()=>props.isOpen, ()=>{
  if(props.isOpen){
    dialog.value.showModal();
  }
});
</script>

<template>
  <dialog
    ref="dialog"
  >
    <div class="p-5 md:px-12 md:py-12 rounded-lg flex flex-col gap-8 justify-between z-60 max-w-2/5">
      <h1 class="text-base lg:text-2xl text-wrap">{{ props.text }}</h1>
  
      <div class="flex gap-3">
        <AppButton severity="success" @click="hanldeAccept">Да</AppButton>
        <AppButton severity="danger" @click="handleClose">Нет</AppButton>
      </div>
    </div>
  </dialog>
</template>