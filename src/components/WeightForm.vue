<template>
  <div class="weight-form">
    <h3>Registrar peso</h3>
    <form @submit.prevent="submitWeight" class="weight-input">
      <input v-model.number="weightValue" type="number" step="0.1" placeholder="Peso (kg)" required />
      <input v-model="weightDate" type="date" required />
      <button type="submit" :disabled="petsStore.loading">{{ petsStore.loading ? 'Guardando...' : 'Añadir' }}</button>
    </form>
    
    <div v-if="pet.weights && pet.weights.length > 0" class="weights-list">
      <h4>Registro de peso:</h4>
      <div v-for="(weight, idx) in pet.weights" :key="idx" class="weight-item">
        <span>{{ weight.weightDate }}: {{ weight.weightValue }} kg</span>
        <button @click="deleteWeight(idx)" class="btn-delete-item" type="button">🗑️</button>
      </div>
    </div>
    <div v-else class="no-weights">
      <p>No hay registro de peso aún</p>
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
const weightValue = ref('')
const weightDate = ref('')

const submitWeight = async () => {
  if (!weightValue.value || !weightDate.value) return
  
  await petsStore.addWeight(props.petId, {
    weightValue: weightValue.value,
    weightDate: weightDate.value
  })
  weightValue.value = ''
  weightDate.value = ''
}

const deleteWeight = async (idx) => {
  if (confirm('¿Eliminar este registro?')) {
    await petsStore.removeWeight(props.petId, idx)
  }
}
</script>

<style scoped>
.weight-form {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.weight-form h3 {
  color: #7B2FBE;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
}

.weight-input {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.weight-input input {
  flex: 1;
  padding: 0.75rem;
  border: 1.5px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.weight-input input:focus {
  outline: none;
  border-color: #7B2FBE;
  box-shadow: 0 0 0 3px rgba(123, 47, 190, 0.1);
}

.weight-input button {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #7B2FBE, #5B1E8C);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
  white-space: nowrap;
}

.weight-input button:hover:not(:disabled) {
  transform: translateY(-2px);
}

.weight-input button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.weights-list h4 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.weight-item {
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

.btn-delete-item {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: transform 0.2s;
}

.btn-delete-item:hover {
  transform: scale(1.2);
}

.no-weights {
  text-align: center;
  padding: 2rem;
  color: #999;
  font-style: italic;
}
</style>