<script setup>
defineProps({
  message: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="error">
    <p>{{ message }}</p>
    <button @click="$emit('retry')">Retry</button>
  </div>
</template>

<style scoped>
.error { color: #c0392b; padding: 1rem; border-radius: 8px; }
</style>
