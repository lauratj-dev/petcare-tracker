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
.detail-container {
  padding: 2rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #fff5f7 100%);
  min-height: 100vh;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #FF6B6B;
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
}

.back-button:hover {
  transform: translateX(-4px);
}

.pet-header {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.pet-header h1 {
  margin: 0 0 0.5rem 0;
  color: #2d3436;
  font-size: 2rem;
}

.pet-meta {
  display: flex;
  gap: 2rem;
  color: #666;
  font-size: 0.95rem;
}

.pet-meta span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section h2 {
  color: #2d3436;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 3px solid #FF6B6B;
  padding-bottom: 0.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  color: #2d3436;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #FF6B6B;
  box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
}

button {
  background: linear-gradient(135deg, #FF6B6B 0%, #FF5252 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(255, 107, 107, 0.3);
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.item {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #FF6B6B;
}

.item p {
  margin: 0.25rem 0;
  color: #2d3436;
}

.item-label {
  font-weight: 600;
  color: #FF6B6B;
}

.empty-message {
  text-align: center;
  padding: 2rem;
  color: #999;
  font-style: italic;
}
</style>