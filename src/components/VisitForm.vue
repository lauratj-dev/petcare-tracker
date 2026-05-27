<template>
  <div class="visit-form">
    <h3>Añadir visita al veterinario</h3>
    <form @submit.prevent="submitVisit" class="visit-input">
      <input v-model="visitDate" type="date" required />
      <input v-model="visitReason" type="text" placeholder="Motivo de la visita" required />
      <input v-model="vetName" type="text" placeholder="Nombre del veterinario" />
      <button type="submit" :disabled="petsStore.loading">{{ petsStore.loading ? 'Guardando...' : 'Añadir' }}</button>
    </form>
    
    <div v-if="pet.visits && pet.visits.length > 0" class="visits-list">
      <h4>Visitas registradas:</h4>
      <div v-for="(visit, idx) in pet.visits" :key="idx" class="visit-item">
        <div class="visit-info">
          <span class="visit-date">{{ visit.visitDate }}</span>
          <span class="visit-reason">{{ visit.visitReason }}</span>
          <span v-if="visit.vetName" class="visit-vet">{{ visit.vetName }}</span>
        </div>
        <button @click="deleteVisit(idx)" class="btn-delete-item" type="button">🗑️</button>
      </div>
    </div>
    <div v-else class="no-visits">
      <p>No hay visitas registradas aún</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePetsFirestoreStore } from '../stores/pets-firestore.js'

const props = defineProps({
  petId: String,
  pet: Object
})

const petsStore = usePetsFirestoreStore()
const visitDate = ref('')
const visitReason = ref('')
const vetName = ref('')

const submitVisit = async () => {
  if (!visitDate.value || !visitReason.value) return
  
  await petsStore.addVisit(props.petId, {
    visitDate: visitDate.value,
    visitReason: visitReason.value,
    vetName: vetName.value || 'No especificado'
  })
  visitDate.value = ''
  visitReason.value = ''
  vetName.value = ''
}

const deleteVisit = async (idx) => {
  if (confirm('¿Eliminar esta visita?')) {
    await petsStore.removeVisit(props.petId, idx)
  }
}
</script>

<style scoped>
.visit-form {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.visit-form h3 {
  color: #7B2FBE;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
}

.visit-input {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.visit-input input {
  flex: 1;
  min-width: 150px;
  padding: 0.75rem;
  border: 1.5px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.visit-input input:focus {
  outline: none;
  border-color: #7B2FBE;
  box-shadow: 0 0 0 3px rgba(123, 47, 190, 0.1);
}

.visit-input button {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #7B2FBE, #5B1E8C);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
  white-space: nowrap;
}

.visit-input button:hover:not(:disabled) {
  transform: translateY(-2px);
}

.visit-input button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.visits-list h4 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.visit-item {
  background: #f9f7ff;
  padding: 1rem;
  margin-bottom: 0.75rem;
  border-left: 4px solid #7B2FBE;
  border-radius: 6px;
  font-size: 0.95rem;
  color: #666;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.visit-info {
  display: flex;
  gap: 1rem;
  flex: 1;
  flex-wrap: wrap;
}

.visit-date {
  font-weight: 700;
  color: #7B2FBE;
}

.visit-reason {
  flex: 1;
}

.visit-vet {
  color: #999;
  font-size: 0.85rem;
}
.btn-delete-item {
  background: white;
  border: 1px solid #dc2626;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  transition: transform 0.2s;
  border-radius: 4px;
  color: #dc2626;
}

.btn-delete-item:hover {
  transform: scale(1.2);
  background: #fee2e2;
}
.no-visits {
  text-align: center;
  padding: 2rem;
  color: #999;
  font-style: italic;
}
</style>