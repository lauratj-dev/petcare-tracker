<template>
  <div class="form-wrapper">
    <form @submit.prevent="submitForm" class="pet-form">
      <h2>{{ isEditing ? 'Editar mascota' : 'Añadir mascota' }}</h2>

      <input v-model="form.name" type="text" placeholder="Nombre" required />
      <select v-model="form.species" required>
        <option value="">Selecciona especie</option>
        <option value="Perro">Perro</option>
        <option value="Gato">Gato</option>
        <option value="Conejo">Conejo</option>
        <option value="Pájaro">Pájaro</option>
      </select>
      <input v-model.number="form.age" type="number" placeholder="Edad" />
      
      <label>Foto (opcional):</label>
      <input type="file" @change="onFileChange" accept="image/*" />
      <img v-if="form.photo" :src="form.photo" alt="preview" class="preview" />

      <div class="buttons">
        <button type="submit" :disabled="petsStore.loading">{{ petsStore.loading ? 'Guardando...' : 'Guardar' }}</button>
        <button type="button" @click="$emit('cancel')">Cancelar</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePetsFirestoreStore } from '../stores/pets-firestore.js'

const props = defineProps({
  petToEdit: Object
})

const emit = defineEmits(['added', 'cancel'])

const petsStore = usePetsFirestoreStore()

const form = ref({
  name: '',
  species: '',
  age: null,
  photo: null
})

const isEditing = computed(() => !!props.petToEdit)

const onFileChange = (e) => {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    form.value.photo = reader.result
  }
  reader.readAsDataURL(file)
}

const submitForm = async () => {
  if (isEditing.value) {
    await petsStore.updatePet(props.petToEdit.id, form.value)
  } else {
    await petsStore.addPet(form.value)
  }
  emit('added')
}
</script>

<style scoped>
.form-wrapper {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.pet-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.pet-form h2 {
  color: #7B2FBE;
  margin-bottom: 1rem;
}

.pet-form input,
.pet-form select {
  padding: 0.75rem;
  border: 1.5px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.pet-form input:focus,
.pet-form select:focus {
  outline: none;
  border-color: #7B2FBE;
}

.preview {
  max-width: 200px;
  border-radius: 8px;
  margin-top: 0.5rem;
}

.buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.buttons button {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}

.buttons button[type="submit"] {
  background: linear-gradient(135deg, #7B2FBE, #5B1E8C);
  color: white;
}

.buttons button[type="button"] {
  background: #ddd;
  color: #333;
}
</style>