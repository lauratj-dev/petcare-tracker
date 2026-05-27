<template>
  <div class="vaccine-form">
    <h3>Añadir vacuna</h3>
    <form @submit.prevent="submitVaccine" class="vaccine-input">
      <input v-model="vaccineName" type="text" placeholder="Nombre vacuna (ej: Rabia)" required />
      <input v-model="nextDate" type="date" required />
      <button type="submit" :disabled="petsStore.loading">{{ petsStore.loading ? 'Guardando...' : 'Añadir' }}</button>
    </form>
    
    <div v-if="pet.vaccines && pet.vaccines.length > 0" class="vaccines-list">
      <h4>Vacunas registradas:</h4>
      <div v-for="(vaccine, idx) in pet.vaccines" :key="idx" class="vaccine-item">
        <span>{{ vaccine.name }} - {{ vaccine.nextDate }}</span>
      </div>
    </div>
    <div v-else class="no-vaccines">
      <p>No hay vacunas registradas aún</p>
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
const vaccineName = ref('')
const nextDate = ref('')

const submitVaccine = async () => {
  if (!vaccineName.value || !nextDate.value) return
  
  await petsStore.addVaccine(props.petId, {
    name: vaccineName.value,
    nextDate: nextDate.value
  })
  vaccineName.value = ''
  nextDate.value = ''
}
</script>

<style scoped>
.vaccine-form {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.vaccine-form h3 {
  color: #7B2FBE;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
}

.vaccine-input {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.vaccine-input input {
  flex: 1;
  padding: 0.75rem;
  border: 1.5px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.vaccine-input input:focus {
  outline: none;
  border-color: #7B2FBE;
  box-shadow: 0 0 0 3px rgba(123, 47, 190, 0.1);
}

.vaccine-input button {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #7B2FBE, #5B1E8C);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
  white-space: nowrap;
}

.vaccine-input button:hover:not(:disabled) {
  transform: translateY(-2px);
}

.vaccine-input button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.vaccines-list h4 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.vaccine-item {
  background: #f9f7ff;
  padding: 1rem;
  margin-bottom: 0.75rem;
  border-left: 4px solid #7B2FBE;
  border-radius: 6px;
  font-size: 0.95rem;
  color: #666;
}

.no-vaccines {
  text-align: center;
  padding: 2rem;
  color: #999;
  font-style: italic;
}
</style>