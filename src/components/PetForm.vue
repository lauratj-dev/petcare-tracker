<template>
  <form @submit.prevent="submitForm" class="pet-form">
    <h2>Añadir nueva mascota</h2>
    
    <div class="form-group">
      <label for="name">Nombre:</label>
      <input 
        v-model="form.name" 
        id="name" 
        type="text" 
        placeholder="Ej: Luna"
        required
      />
    </div>

    <div class="form-group">
      <label for="species">Especie:</label>
      <select v-model="form.species" id="species" required>
        <option value="">Selecciona una especie</option>
        <option value="Perro">Perro</option>
        <option value="Gato">Gato</option>
        <option value="Conejo">Conejo</option>
        <option value="Otro">Otro</option>
      </select>
    </div>

    <div class="form-group">
      <label for="age">Edad (años):</label>
      <input 
        v-model.number="form.age" 
        id="age" 
        type="number" 
        placeholder="Ej: 3"
        required
      />
    </div>

    <button type="submit" class="btn-submit">Añadir mascota</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { usePetsStore } from '../stores/pets'

const store = usePetsStore()

const form = ref({
  name: '',
  species: '',
  age: null
})

function submitForm() {
  const newPet = {
    id: Date.now(),
    name: form.value.name,
    species: form.value.species,
    age: form.value.age
  }
  
  store.addPet(newPet)
  
  form.value = {
    name: '',
    species: '',
    age: null
  }
}
</script>

<style scoped>
.form-container {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.form-container h2 {
  color: #2d3436;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  color: #2d3436;
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
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
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.2);
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(255, 107, 107, 0.3);
}

button:active {
  transform: translateY(0);
}
</style>