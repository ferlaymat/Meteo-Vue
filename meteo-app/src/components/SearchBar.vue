<script setup>
import { ref } from 'vue'

defineProps({
  modelCity: {
    type: String,
    default: 'Cusy'
  }
})

// Declare event emit by the component
const emit = defineEmits(['search'])

const input = ref('')

function handleSubmit() {
  if (!input.value.trim()) return;// exit if empty value
  emit('search', input.value.trim());  // handle to emit the event
  input.value = '';
}
</script>

<template>
  <div class="search">
    <input
      v-model="input"
      placeholder="Search a city..."
      @keyup.enter="handleSubmit"
    />
    <button @click="handleSubmit">Search</button>
  </div>
</template>

<style scoped>
.search { display: flex; gap: 8px; margin-bottom: 1.5rem; }
input { flex: 1; padding: 8px 12px; border: 1px solid #ddd; border-radius: 6px; }
button { padding: 8px 16px; border-radius: 6px; border: none; background: #1D9E75; color: white; cursor: pointer; }
</style>