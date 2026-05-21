<template>
  <div class="pet-detail">
    <router-link to="/" class="back-link">← Volver</router-link>
    
    <div v-if="pet" class="pet-info">
      <h1>{{ pet.name }}</h1>
      <p><strong>Especie:</strong> {{ pet.species }}</p>
      <p><strong>Edad:</strong> {{ pet.age }} años</p>

      <hr class="divider" />

      <!-- VISITAS AL VETERINARIO -->
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

      <div v-if="pet.visits.length === 0" class="no-items">
        <p>No hay visitas registradas</p>
      </div>

      <div v-else class="items-list">
        <div v-for="(visit, index) in pet.visits" :key="index" class="item">
          <p><strong>Fecha:</strong> {{ visit.date }}</p>
          <p><strong>Motivo:</strong> {{ visit.reason }}</p>
        </div>
      </div>

      <hr class="divider" />

      <!-- VACUNAS -->
      <h2>Vacunas</h2>

      <form @submit.prevent="addNewVaccine" class="visit-form">
        <div class="form-group">
          <label for="vaccine-name">Nombre:</label>
          <input 
            v-model="newVaccine.name" 
            id="vaccine-name" 
            type="text" 
            placeholder="Ej: Rabia"
            required
          />
        </div>

        <div class="form-group">
          <label for="vaccine-date">Fecha de aplicación:</label>
          <input 
            v-model="newVaccine.date" 
            id="vaccine-date" 
            type="date" 
            required
          />
        </div>

        <div class="form-group">
          <label for="vaccine-next">Próxima dosis:</label>
          <input 
            v-model="newVaccine.nextDate" 
            id="vaccine-next" 
            type="date" 
            required
          />
        </div>

        <button type="submit" class="btn-submit">Añadir vacuna</button>
      </form>

      <div v-if="pet.vaccines.length === 0" class="no-items">
        <p>No hay vacunas registradas</p>
      </div>

      <div v-else class="items-list">
        <div v-for="(vaccine, index) in pet.vaccines" :key="index" class="item">
          <p><strong>Vacuna:</strong> {{ vaccine.name }}</p>
          <p><strong>Aplicada:</strong> {{ vaccine.date }}</p>
          <p><strong>Próxima:</strong> {{ vaccine.nextDate }}</p>
        </div>
      </div>

      <hr class="divider" />

      <!-- PESO -->
      <h2>Peso</h2>

      <form @submit.prevent="addNewWeight" class="visit-form">
        <div class="form-group">
          <label for="weight-date">Fecha:</label>
          <input 
            v-model="newWeight.date" 
            id="weight-date" 
            type="date" 
            required
          />
        </div>

        <div class="form-group">
          <label for="weight-kg">Peso (kg):</label>
          <input 
            v-model.number="newWeight.kg" 
            id="weight-kg" 
            type="number" 
            step="0.1"
            placeholder="Ej: 5.5"
            required
          />
        </div>

        <button type="submit" class="btn-submit">Añadir peso</button>
      </form>

      <div v-if="pet.weights.length === 0" class="no-items">
        <p>No hay pesos registrados</p>
      </div>

      <div v-else class="items-list">
        <div v-for="(weight, index) in pet.weights" :key="index" class="item">
          <p><strong>Fecha:</strong> {{ weight.date }}</p>
          <p><strong>Peso:</strong> {{ weight.kg }} kg</p>
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

const newVaccine = ref({
  name: '',
  date: '',
  nextDate: ''
})

const newWeight = ref({
  date: '',
  kg: null
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
    newVisit.value = { date: '', reason: '' }
  }
}

function addNewVaccine() {
  if (pet.value) {
    store.addVaccine(pet.value.id, {
      name: newVaccine.value.name,
      date: newVaccine.value.date,
      nextDate: newVaccine.value.nextDate
    })
    newVaccine.value = { name: '', date: '', nextDate: '' }
  }
}

function addNewWeight() {
  if (pet.value) {
    store.addWeight(pet.value.id, {
      date: newWeight.value.date,
      kg: newWeight.value.kg
    })
    newWeight.value = { date: '', kg: null }
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

.no-items {
  text-align: center;
  color: #999;
  padding: 20px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.item {
  background-color: white;
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 4px;
}

.item p {
  margin: 5px 0;
}

.not-found {
  text-align: center;
  color: #666;
  padding: 30px;
}
</style>