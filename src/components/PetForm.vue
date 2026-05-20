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
.pet-form {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

h2 {
  margin-top: 0;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #333;
  font-weight: bold;
}

input, select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

.btn-submit {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.btn-submit:hover {
  background-color: #45a049;
}
</style>