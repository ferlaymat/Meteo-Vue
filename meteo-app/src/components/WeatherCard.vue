<script setup>
// defineProps() - allow to declare Props required from component parent 
const props = defineProps({
  temp: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: '01d'   // default value if not proovided
  }
})
</script>

<template>
  <div class="card">
    <h2>{{ city }}</h2>
    <img
      :src="`https://openweathermap.org/img/wn/${icon}@2x.png`"
      :alt="desc"
    />
    <p class="temp">{{ temp }}</p>
    <p class="desc">{{ desc }}</p>
  </div>
</template>

<style scoped>
.card { text-align: center; padding: 1.5rem; }
.temp { font-size: 3rem; font-weight: 500;}
.desc { color: #666; text-transform: capitalize; margin-top: 10px; }
</style>