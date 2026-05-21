<template>
  <div class="pet-detail">
    <router-link to="/" class="back-link">← Volver</router-link>
    
    <div v-if="pet" class="pet-info">
      <h1>{{ pet.name }}</h1>
      <p><strong>Especie:</strong> {{ pet.species }}</p>
      <p><strong>Edad:</strong> {{ pet.age }} años</p>

      <hr class="divider" />

      <h2>Visitas al Veterinario</h2>

      <form @submit.prevent="addNewVisit" class="visit-form">
        <div class="form-group">
          <label for="visit-date">Fecha:</label>
          <input 
            v-model="newVisit.date" 
            id="visit-date" 
            type="date" 
            required
          />
        </div>

        <div class="form-group">
          <label for="visit-reason">Motivo:</label>
          <input 
            v-model="newVisit.reason" 
            id="visit-reason" 
            type="text" 
            placeholder="Ej: Revisión anual"
            required
          />
        </div>

        <button type="submit" class="btn-submit">Añadir visita</button>
      </form>

      <div v-if="pet.visits.length === 0" class="no-visits">
        <p>No hay visitas registradas</p>
      </div>

      <div v-else class="visits-list">
        <div v-for="(visit, index) in pet.visits" :key="index" class="visit-item">
          <p><strong>Fecha:</strong> {{ visit.date }}</p>
          <p><strong>Motivo:</strong> {{ visit.reason }}</p>
        </div>
      </div>
    </div>
    
    <div v-else class="not-found">
      <p>Mascota no encontrada</p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { usePetsStore } from '../stores/pets'

const route = useRoute()
const store = usePetsStore()

const newVisit = ref({
  date: '',
  reason: ''
})

const pet = computed(() => {
  return store.pets.find(p => p.id === parseInt(route.params.id))
})

function addNewVisit() {
  if (pet.value) {
    store.addVisit(pet.value.id, {
      date: newVisit.value.date,
      reason: newVisit.value.reason
    })
    
    newVisit.value = {
      date: '',
      reason: ''
    }
  }
}
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
}

.back-link:hover {
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

h2 {
  color: #333;
  margin-top: 20px;
  margin-bottom: 15px;
  font-weight: 700;
  font-size: 18px;
}

p {
  color: #666;
  font-size: 16px;
  margin: 10px 0;
}

.divider {
  border: none;
  border-top: 1px solid #ccc;
  margin: 20px 0;
}

.visit-form {
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #333;
  font-weight: 700;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #4CAF50;
}

.btn-submit {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
}

.btn-submit:hover {
  background-color: #45a049;
}

.no-visits {
  text-align: center;
  color: #999;
  padding: 20px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.visits-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.visit-item {
  background-color: white;
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 4px;
}

.visit-item p {
  margin: 5px 0;
}

.not-found {
  text-align: center;
  color: #666;
  padding: 30px;
}
</style>