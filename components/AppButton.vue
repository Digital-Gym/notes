<script lang="ts" setup>
const props = defineProps({
  severity: {
    required: false,
    type: String,
    default: 'secondary'
  }
});
</script>


<template>
  <div 
    class="
    border p-3 rounded-lg min-w-20 flex justify-center
    items-center h-11 text-slate-800 hover:text-slate-100 bg-slate-200
    transition select-none
    "
    :class="{
      'hover:bg-red-600': props.severity == 'danger',
      'hover:bg-blue-600': props.severity == 'info',
      'hover:bg-green-600': props.severity == 'success',
      'hover:bg-slate-800': props.severity == 'secondary',
    }"
  >
    <slot />
  </div>
</template>