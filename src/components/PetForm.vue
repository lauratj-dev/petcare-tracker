<template>
  <div class="pet-form">
    <h2 class="form-title">{{ isEditing ? '✏️ Editar mascota' : 'Nueva mascota' }}</h2>

    <form @submit.prevent="handleSubmit" class="form-grid">
      <div class="form-group">
        <label class="form-label">Nombre</label>
        <input
          v-model="form.name"
          type="text"
          placeholder="Ej: Luna"
          class="form-input"
          required
        />
      </div>

      <div class="form-group">
        <label class="form-label">Especie</label>
        <select v-model="form.species" class="form-input" required>
          <option value="">Selecciona una especie</option>
          <option value="Perro">🐕 Perro</option>
          <option value="Gato">🐈 Gato</option>
          <option value="Conejo">🐰 Conejo</option>
          <option value="Otro">✨ Otro</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Edad (años)</label>
        <input
          v-model.number="form.age"
          type="number"
          placeholder="Ej: 3"
          class="form-input"
          min="0"
          required
        />
      </div>

 <div class="form-actions">
  <button
    type="submit"
    style="background: linear-gradient(135deg, #7B2FBE, #5B1E8C); color: #ffffff; padding: 0.75rem 1.25rem; border: none; border-radius: 14px; font-weight: 700; font-size: 0.95rem; cursor: pointer; width: 100%; white-space: nowrap;"
  >
    {{ isEditing ? '💾 Guardar cambios' : '+ Añadir mascota' }}
  </button>
  <button v-if="isEditing" type="button" class="btn-cancel" @click="emit('cancel')">
    Cancelar
  </button>
</div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { usePetsStore } from '../stores/pets'

const props = defineProps({
  petToEdit: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['added', 'updated', 'cancel'])
const store = usePetsStore()

const isEditing = ref(false)
const form = ref({ name: '', species: '', age: null })

watch(() => props.petToEdit, (pet) => {
  if (pet) {
    isEditing.value = true
    form.value = { name: pet.name, species: pet.species, age: pet.age }
  } else {
    isEditing.value = false
    form.value = { name: '', species: '', age: null }
  }
}, { immediate: true })

function handleSubmit() {
  if (isEditing.value && props.petToEdit) {
    store.updatePet(props.petToEdit.id, {
      name: form.value.name,
      species: form.value.species,
      age: form.value.age
    })
    emit('updated')
  } else {
    store.addPet({
      id: Date.now(),
      name: form.value.name,
      species: form.value.species,
      age: form.value.age,
    })
    emit('added')
  }
  form.value = { name: '', species: '', age: null }
}
</script>

<style scoped>
.pet-form {
  background: white;
  border: 1.5px solid var(--border-soft);
  border-radius: var(--radius-lg);
  padding: 1.75rem;
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow-md);
}

.form-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--text-dark);
  margin-bottom: 1.25rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  align-items: end;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-label {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-body);
  letter-spacing: 0.3px;
}

.form-input {
  padding: 0.75rem 1rem;
  border: 1.5px solid var(--border-soft);
  border-radius: var(--radius-md);
  font-size: 0.95rem;
  color: var(--text-dark);
  background: var(--bg-page);
  transition: all var(--transition);
  width: 100%;
}

.form-input:focus {
  outline: none;
  border-color: var(--purple-mid);
  background: white;
  box-shadow: 0 0 0 3px rgba(123, 47, 190, 0.1);
}

.form-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: flex-end;
}

.btn-cancel {
  padding: 0.75rem 1.25rem;
  border: 1.5px solid var(--border-soft);
  border-radius: var(--radius-md);
  background: white;
  color: var(--text-body);
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all var(--transition);
  white-space: nowrap;
  width: 100%;
}

.btn-cancel:hover {
  background: var(--purple-ghost);
  border-color: var(--border-mid);
}
</style>