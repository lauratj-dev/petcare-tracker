<template>
  <div class="pet-form">
    <h2 class="form-title">Nueva mascota</h2>

    <form @submit.prevent="addPet" class="form-grid">
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
        <button type="submit" class="btn-submit">
          + Añadir mascota
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePetsStore } from '../stores/pets'

const emit = defineEmits(['added'])
const store = usePetsStore()

const form = ref({ name: '', species: '', age: null })

function addPet() {
  store.addPet({
    id: Date.now(),
    name: form.value.name,
    species: form.value.species,
    age: form.value.age,
  })
  form.value = { name: '', species: '', age: null }
  emit('added')
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
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
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
  align-items: flex-end;
}

.btn-submit {
  width: 100%;
  padding: 0.75rem 1.25rem;
  background: linear-gradient(135deg, var(--purple-main), var(--purple-deep));
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-weight: 700;
  font-size: 0.95rem;
  box-shadow: var(--shadow-md);
  transition: all var(--transition);
}

.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-submit:active {
  transform: translateY(0);
}
</style>