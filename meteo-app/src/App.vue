<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { Weather, TemperatureUnit } from './types/Weather.types'
import SearchBar from './components/SearchBar.vue'
import Errormessage from './components/Errormessage.vue'
import WeatherCard from './components/WeatherCard.vue'
import { API_KEY, BASE_URL, DEFAULT_CITY, LOCALSTORAGE_KEY, WEATHER_ENDPOINT } from './config/Constants'
import { getIconLabel } from './types/WeatherIcons'
import { formatTemp } from './utils/Temperature'

//ref allow to have a reactive pointer to detect any changes on the variable
const weather = ref<Weather | null>(null);
const loading = ref(false);
const error   = ref<string | null>(null);
const unit    = ref<TemperatureUnit>('C');          // 'C' or 'F'
const city     = ref(DEFAULT_CITY);
const history  = ref<string[]>([]);




// --- computed ---

const tempDisplay = computed(() => {
  if (!weather.value) return '--';

  return formatTemp(weather.value.main.temp,  unit.value);
})

const feelsLikeDisplay = computed(() => {
  if (!weather.value) return '--';
  return formatTemp(weather.value.main.feels_like,  unit.value);
})

const weatherIcon = computed(() => {
  if (!weather.value) return null;
  const code = weather.value.weather[0].icon;
  return getIconLabel(code);
})

// --- fetch ---

// we define the function to fetch data from open API
async function fetchWeather(searchCity = city.value) {
  loading.value = true;
  error.value   = null;

  try {
    const res = await fetch(
      `${BASE_URL}${WEATHER_ENDPOINT}?q=${searchCity}&APPID=${API_KEY}&units=metric`
    );

    // fetch does not throw on HTTP errors sowe need to check manually
    if (!res.ok) {
      throw new Error(res.status === 404 ? 'City not found' : 'Error server: ' + res.statusText);
    }

    weather.value = await res.json();
    city.value    = searchCity;

    // add history without uplet
    if (!history.value.includes(searchCity)) {
      history.value = [searchCity, ...history.value].slice(0, 5);
    }
  } catch (err: unknown) {
     if (err instanceof Error) {
      error.value = err.message;  // now, err is automatically cast as an error
    } else {
      error.value = 'Unexpected error happenned';
    }

  } finally {
    loading.value = false;  // always executed
  }
}

// --- watch ---

// Reload when city changes
watch(city, (newCity) => {
  fetchWeather(newCity);
})

// Save history in localstorage at each changes
watch(history, (newHistory) => {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(newHistory));
}, { deep: true });

// Load the function at the component loading - equivalent of useEffect in React
onMounted(() => {
  // Reload history
  const saved = localStorage.getItem(LOCALSTORAGE_KEY);
  if (saved) history.value = JSON.parse(saved);
  fetchWeather();
})

</script>

<template>
  <div class="app">
    <header>
      <h1>Weather station</h1>
      <div class="unit-toggle">
        <button :class="{ active: unit === 'C' }" @click="unit = 'C'">°C</button>
        <button :class="{ active: unit === 'F' }" @click="unit = 'F'">°F</button>
      </div>
    </header>
    <!-- listening event emit by searchbar - if function required 1 args, it s not needed to write prenthesis-->
    <SearchBar @search="fetchWeather($event)" />

    <div v-if="history.length" class="history">
      <span
        v-for="h in history"
        :key="h"
        @click="fetchWeather(h)"
      >{{ h }}</span>
    </div>

    <!-- no need to use bracket in v-X directive -->
    <p v-if="loading">Loading...</p>


    <p v-else-if="error" style="color: red">{{ error }}</p>

       <Errormessage
      v-else-if="error"
      :message="error"
      @retry="fetchWeather()"
    />

    <WeatherCard
      v-else-if="weather"
      :city="weather.name"
      :temp="tempDisplay"
      :feels-like="feelsLikeDisplay"
      :desc="weather.weather?.[0]?.description"
      :icon="weather.weather?.[0]?.icon"
      :weather-icon="weatherIcon"
      :humidity="weather.main.humidity"
      :wind="weather.wind.speed"
    />

  </div>
</template>

<style scoped>
.app { max-width: 480px; margin: 0 auto; padding: 2rem 1rem; }
header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
.unit-toggle { display: flex; gap: 4px; }
.unit-toggle button { padding: 4px 10px; border: 1px solid #ddd; border-radius: 6px; background: none; cursor: pointer; }
.unit-toggle button.active { background: #1D9E75; color: white; border-color: #1D9E75; }
.history { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 1rem; }
.history span { padding: 4px 12px; background: #f0f0f0; border-radius: 20px; cursor: pointer; font-size: 13px; }
</style>
