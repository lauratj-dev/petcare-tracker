<template>
  <div class="vaccine-form">
    <h3>Añadir vacuna</h3>
    <form @submit.prevent="submitVaccine">
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
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
}

.vaccine-form h3 {
  color: #7B2FBE;
  margin-bottom: 0.5rem;
}

form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
}

button {
  padding: 0.5rem 1rem;
  background: #7B2FBE;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}

.vaccines-list {
  margin-top: 1rem;
}

.vaccines-list h4 {
  color: #333;
  margin-bottom: 0.5rem;
}

.vaccine-item {
  background: white;
  padding: 0.5rem;
  margin: 0.25rem 0;
  border-left: 3px solid #7B2FBE;
  font-size: 0.9rem;
}
</style>