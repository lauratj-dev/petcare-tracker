<template>
  <div class="home">

    <!-- HEADER -->
    <div class="page-header">
      <div class="header-left">
        <h1 class="page-title">Mis Mascotas</h1>
        <p class="page-subtitle">Gestiona la salud de tus compañeros</p>
      </div>
      <div class="header-right">
        <button class="btn-add-toggle" @click="showForm = !showForm">
          <span>{{ showForm ? '✕ Cancelar' : '+ Añadir mascota' }}</span>
        </button>
      </div>
    </div>

    <!-- FORMULARIO COLAPSABLE -->
    <Transition name="slide-down">
      <PetForm v-if="showForm" @added="showForm = false" />
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

const filteredPets = computed(() =>
  store.pets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchText.value.toLowerCase())
    const matchesSpecies = selectedSpecies.value === '' || pet.species === selectedSpecies.value
    return matchesSearch && matchesSpecies
  })
)

const totalVisits = computed(() => store.pets.reduce((acc, p) => acc + (p.visits?.length || 0), 0))
const totalVaccines = computed(() => store.pets.reduce((acc, p) => acc + (p.vaccines?.length || 0), 0))
</script>

<style scoped>
.home {
  padding: 2.5rem 2rem;
  max-width: 1100px;
  margin: 0 auto;
}

/* HEADER */
.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 2rem;
  gap: 1rem;
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
}

.btn-add-toggle:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* SEARCH */
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

/* STATS */
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

/* EMPTY */
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

/* GRID */
.pets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
}

/* TRANSITION */
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