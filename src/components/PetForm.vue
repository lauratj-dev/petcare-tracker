<template>
  <div class="pet-form">
    <h2 class="form-title">{{ isEditing ? '✏️ Editar mascota' : 'Nueva mascota' }}</h2>

    <form @submit.prevent="handleSubmit" class="form-grid">
      <!-- FOTO -->
      <div class="form-group form-photo">
        <label class="form-label">Foto</label>
        <div class="photo-upload">
          <div v-if="photoPreview" class="photo-preview">
            <img :src="photoPreview" :alt="form.name || 'Foto mascota'" />
            <button type="button" class="btn-remove-photo" @click="removePhoto">✕</button>
          </div>
          <label v-else class="photo-input-label">
            <input
              type="file"
              accept="image/*"
              @change="handlePhotoUpload"
              style="display: none"
            />
            <span class="photo-placeholder">📸 Subir foto</span>
          </label>
        </div>
      </div>

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
const photoPreview = ref(null)
const form = ref({ name: '', species: '', age: null, photo: null })

watch(() => props.petToEdit, (pet) => {
  if (pet) {
    isEditing.value = true
    form.value = { name: pet.name, species: pet.species, age: pet.age, photo: pet.photo || null }
    photoPreview.value = pet.photo || null
  } else {
    isEditing.value = false
    form.value = { name: '', species: '', age: null, photo: null }
    photoPreview.value = null
  }
}, { immediate: true })

function handlePhotoUpload(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      photoPreview.value = e.target.result
      form.value.photo = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

function removePhoto() {
  photoPreview.value = null
  form.value.photo = null
}

function handleSubmit() {
  if (isEditing.value && props.petToEdit) {
    store.updatePet(props.petToEdit.id, {
      name: form.value.name,
      species: form.value.species,
      age: form.value.age,
      photo: form.value.photo
    })
    emit('updated')
  } else {
    store.addPet({
      id: Date.now(),
      name: form.value.name,
      species: form.value.species,
      age: form.value.age,
      photo: form.value.photo
    })
    emit('added')
  }
  form.value = { name: '', species: '', age: null, photo: null }
  photoPreview.value = null
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
  grid-template-columns: 1fr;
  gap: 1rem;
  align-items: end;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-photo {
  grid-column: 1 / -1;
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

/* FOTO */
.photo-upload {
  border: 2px dashed var(--border-mid);
  border-radius: var(--radius-md);
  padding: 1rem;
  text-align: center;
  transition: all var(--transition);
}

.photo-preview {
  position: relative;
  width: 100%;
  max-width: 150px;
  margin: 0 auto;
}

.photo-preview img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

.btn-remove-photo {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #ef4444;
  color: white;
  border: none;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition);
  box-shadow: var(--shadow-md);
}

.btn-remove-photo:hover {
  transform: scale(1.1);
}

.photo-input-label {
  cursor: pointer;
  display: block;
}

.photo-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: var(--text-muted);
  font-weight: 600;
  font-size: 0.95rem;
  padding: 0.5rem;
  transition: all var(--transition);
}

.photo-upload:hover {
  border-color: var(--purple-mid);
  background: var(--purple-ghost);
}

.form-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: flex-end;
  grid-column: 1 / -1;
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