<template>
  <div class="home">

    <!-- HEADER -->
    <div class="page-header">
      <div class="header-left">
        <h1 class="page-title">Mis Mascotas</h1>
        <p class="page-subtitle">Gestiona la salud de tus compañeros</p>
      </div>
      <div class="header-right">
        <button class="btn-action-secondary" @click="exportData" title="Descargar mascotas como JSON">
          📥 Exportar
        </button>
        <button class="btn-action-secondary" @click="triggerImport" title="Cargar mascotas desde JSON">
          📤 Importar
        </button>
        <input
          ref="fileInput"
          type="file"
          accept=".json"
          style="display: none"
          @change="importData"
        />
        <button class="btn-add-toggle" @click="toggleForm">
          <span>{{ showForm ? '✕ Cancelar' : '+ Añadir mascota' }}</span>
        </button>
      </div>
    </div>

    <!-- TOAST NOTIFICACIÓN -->
    <Transition name="toast-slide">
      <div v-if="toast" :class="['toast', toast.type]">
        <span>{{ toast.message }}</span>
      </div>
    </Transition>

    <!-- FORMULARIO (crear o editar) -->
    <Transition name="slide-down">
      <PetForm
        v-if="showForm"
        :petToEdit="petToEdit"
        @added="onAdded"
        @updated="onUpdated"
        @cancel="onCancel"
      />
    </Transition>

    <!-- BUSCADOR Y FILTROS -->
    <div class="search-bar">
      <div class="search-input-wrapper">
        <span class="search-icon">🔍</span>
        <input
          v-model="searchText"
          type="text"
          placeholder="Buscar por nombre..."
          class="search-input"
        />
      </div>
      <select v-model="selectedSpecies" class="filter-select">
        <option value="">Todas las especies</option>
        <option value="Perro">🐕 Perro</option>
        <option value="Gato">🐈 Gato</option>
        <option value="Conejo">🐰 Conejo</option>
        <option value="Otro">✨ Otro</option>
      </select>
    </div>

    <!-- STATS -->
    <div class="stats-row" v-if="store.pets.length > 0">
      <div class="stat-chip">
        <span class="stat-num">{{ store.pets.length }}</span>
        <span class="stat-label">mascota{{ store.pets.length !== 1 ? 's' : '' }}</span>
      </div>
      <div class="stat-chip">
        <span class="stat-num">{{ totalVisits }}</span>
        <span class="stat-label">visitas registradas</span>
      </div>
      <div class="stat-chip">
        <span class="stat-num">{{ totalVaccines }}</span>
        <span class="stat-label">vacunas al día</span>
      </div>
    </div>

    <!-- EMPTY STATE -->
    <div v-if="filteredPets.length === 0" class="empty-state">
      <div class="empty-icon">🐾</div>
      <h3>{{ store.pets.length === 0 ? '¡Añade tu primera mascota!' : 'Sin resultados' }}</h3>
      <p>{{ store.pets.length === 0 ? 'Pulsa el botón de arriba para empezar.' : 'Prueba con otro nombre o especie.' }}</p>
    </div>

    <!-- GRID DE MASCOTAS -->
    <div v-else class="pets-grid">
      <PetCard
        v-for="pet in filteredPets"
        :key="pet.id"
        :id="pet.id"
        :name="pet.name"
        :species="pet.species"
        :age="pet.age"
        :photo="pet.photo"
        @edit="onEditRequest"
      />
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PetCard from '../components/PetCard.vue'
import PetForm from '../components/PetForm.vue'
import { usePetsStore } from '../stores/pets'

const store = usePetsStore()
const searchText = ref('')
const selectedSpecies = ref('')
const showForm = ref(false)
const petToEdit = ref(null)
const fileInput = ref(null)
const toast = ref(null)

const filteredPets = computed(() =>
  store.pets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchText.value.toLowerCase())
    const matchesSpecies = selectedSpecies.value === '' || pet.species === selectedSpecies.value
    return matchesSearch && matchesSpecies
  })
)

const totalVisits = computed(() => store.pets.reduce((acc, p) => acc + (p.visits?.length || 0), 0))
const totalVaccines = computed(() => store.pets.reduce((acc, p) => acc + (p.vaccines?.length || 0), 0))

function toggleForm() {
  if (showForm.value && petToEdit.value) {
    petToEdit.value = null
  }
  showForm.value = !showForm.value
}

function onEditRequest(id) {
  petToEdit.value = store.pets.find(p => p.id === id) || null
  showForm.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function onAdded() {
  showForm.value = false
  petToEdit.value = null
}

function onUpdated() {
  showForm.value = false
  petToEdit.value = null
}

function onCancel() {
  showForm.value = false
  petToEdit.value = null
}

// EXPORTAR JSON
function exportData() {
  const data = {
    exported: new Date().toISOString(),
    version: '1.0',
    pets: store.pets
  }
  
  const json = JSON.stringify(data, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `mascotas_${new Date().toISOString().split('T')[0]}.json`
  link.click()
  URL.revokeObjectURL(url)
  
  showToast(`✅ ${store.pets.length} mascota${store.pets.length !== 1 ? 's' : ''} exportada${store.pets.length !== 1 ? 's' : ''}`, 'success')
}

// IMPORTAR JSON
function triggerImport() {
  fileInput.value?.click()
}

function importData(event) {
  const file = event.target.files?.[0]
  if (!file) return
  
  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const content = e.target?.result
      const data = JSON.parse(content)
      const pets = data.pets || data
      
      if (!Array.isArray(pets)) {
        showToast('❌ Formato inválido. Debe ser un array de mascotas.', 'error')
        return
      }
      
      let added = 0
      pets.forEach(pet => {
        if (pet.name && pet.species && pet.age !== undefined) {
          const existing = store.pets.find(p => p.id === pet.id)
          if (!existing) {
            store.addPet({
              id: pet.id || Date.now(),
              name: pet.name,
              species: pet.species,
              age: pet.age,
              photo: pet.photo || null,
              visits: pet.visits || [],
              vaccines: pet.vaccines || [],
              weights: pet.weights || []
            })
            added++
          }
        }
      })
      
      if (added > 0) {
        showToast(`✅ ${added} mascota${added !== 1 ? 's' : ''} importada${added !== 1 ? 's' : ''}`, 'success')
      } else {
        showToast('ℹ️ No hay mascotas nuevas para importar', 'info')
      }
    } catch (error) {
      showToast('❌ Error al leer el archivo JSON', 'error')
    }
  }
  reader.readAsText(file)
  
  // Reset file input
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

function showToast(message, type = 'success') {
  toast.value = { message, type }
  setTimeout(() => {
    toast.value = null
  }, 3000)
}
</script>

<style scoped>
.home {
  padding: 2.5rem 2rem;
  max-width: 1100px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 2rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.header-left {
  flex: 1;
}

.header-right {
  display: flex;
  gap: 0.75rem;
  align-items: flex-end;
  flex-wrap: wrap;
}

.page-title {
  font-size: 2rem;
  font-weight: 900;
  color: var(--text-dark);
  letter-spacing: -0.5px;
  line-height: 1.1;
}

.page-subtitle {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin-top: 0.25rem;
}

.btn-add-toggle {
  background: linear-gradient(135deg, var(--purple-main), var(--purple-deep));
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-lg);
  font-weight: 700;
  font-size: 0.95rem;
  box-shadow: var(--shadow-md);
  transition: all var(--transition);
  white-space: nowrap;
  cursor: pointer;
}

.btn-add-toggle:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-action-secondary {
  background: white;
  color: var(--purple-mid);
  border: 1.5px solid var(--border-soft);
  padding: 0.65rem 1.25rem;
  border-radius: var(--radius-lg);
  font-weight: 700;
  font-size: 0.9rem;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition);
  white-space: nowrap;
  cursor: pointer;
}

.btn-action-secondary:hover {
  background: var(--purple-ghost);
  border-color: var(--purple-mid);
  transform: translateY(-2px);
}

/* TOAST */
.toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 1rem 1.5rem;
  border-radius: var(--radius-lg);
  font-weight: 700;
  box-shadow: var(--shadow-lg);
  z-index: 999;
  max-width: 300px;
}

.toast.success {
  background: #dcfce7;
  color: #166534;
  border: 1.5px solid #86efac;
}

.toast.error {
  background: #fee2e2;
  color: #991b1b;
  border: 1.5px solid #fca5a5;
}

.toast.info {
  background: #dbeafe;
  color: #1e40af;
  border: 1.5px solid #93c5fd;
}

.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.3s ease;
}

.toast-slide-enter-from,
.toast-slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.search-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.search-input-wrapper {
  position: relative;
  flex: 1;
  min-width: 220px;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 2.8rem;
  border: 1.5px solid var(--border-soft);
  border-radius: var(--radius-md);
  font-size: 0.95rem;
  background: white;
  color: var(--text-dark);
  transition: all var(--transition);
  box-shadow: var(--shadow-sm);
}

.search-input:focus {
  outline: none;
  border-color: var(--purple-mid);
  box-shadow: 0 0 0 3px rgba(123, 47, 190, 0.12);
}

.filter-select {
  padding: 0.8rem 1rem;
  border: 1.5px solid var(--border-soft);
  border-radius: var(--radius-md);
  font-size: 0.95rem;
  background: white;
  color: var(--text-dark);
  font-weight: 600;
  transition: all var(--transition);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
}

.filter-select:focus {
  outline: none;
  border-color: var(--purple-mid);
}

.stats-row {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.stat-chip {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--purple-ghost);
  border: 1.5px solid var(--border-soft);
  padding: 0.5rem 1rem;
  border-radius: 99px;
}

.stat-num {
  font-weight: 800;
  font-size: 1.1rem;
  color: var(--purple-deep);
}

.stat-label {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-weight: 600;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  border: 2px dashed var(--border-mid);
  border-radius: var(--radius-xl);
  background: var(--purple-ghost);
  margin-top: 1rem;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--text-dark);
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: var(--text-muted);
  font-size: 0.95rem;
}

.pets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>