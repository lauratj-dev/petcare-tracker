<template>
  <div class="pet-detail">
    <router-link to="/" class="back-link">← Volver</router-link>
    
    <div v-if="pet" class="pet-info">
      <h1>{{ pet.name }}</h1>
      <p><strong>Especie:</strong> {{ pet.species }}</p>
      <p><strong>Edad:</strong> {{ pet.age }} años</p>
    </div>
    
    <div v-else class="not-found">
      <p>Mascota no encontrada</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePetsStore } from '../stores/pets'

const route = useRoute()
const store = usePetsStore()

const pet = computed(() => {
  return store.pets.find(p => p.id === parseInt(route.params.id))
})
</script>

<style scoped>
.pet-detail {
  padding: 20px;
}

.back-link {
  display: inline-block;
  margin-bottom: 20px;
  color: #4CAF50;
  text-decoration: none;
  font-weight: 700;
  transition: color 0.3s ease;
}

.back-link:hover {
  color: #45a049;
  text-decoration: underline;
}

.pet-info {
  background-color: #f9f9f9;
  border: 2px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
}

h1 {
  color: #333;
  margin-top: 0;
  margin-bottom: 15px;
  font-weight: 700;
}

p {
  color: #666;
  font-size: 18px;
  margin: 10px 0;
}

.not-found {
  text-align: center;
  color: #666;
  padding: 30px;
}
</style>