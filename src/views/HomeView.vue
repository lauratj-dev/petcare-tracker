<template>
  <div class="home">
    <h1>Mis Mascotas</h1>
    
    <PetForm />

    <!-- BUSCADOR Y FILTROS -->
    <div class="search-filters">
      <div class="form-group">
        <input 
          v-model="searchText" 
          type="text" 
          placeholder="Buscar por nombre..."
          class="search-input"
        />
      </div>

      <div class="form-group">
        <select v-model="selectedSpecies" class="filter-select">
          <option value="">Todas las especies</option>
          <option value="Perro">Perro</option>
          <option value="Gato">Gato</option>
          <option value="Conejo">Conejo</option>
          <option value="Otro">Otro</option>
        </select>
      </div>
    </div>

    <!-- LISTA DE MASCOTAS FILTRADAS -->
    <div v-if="filteredPets.length === 0" class="no-pets">
      <p>No tienes mascotas aún. ¡Añade una!</p>
    </div>
    
    <div v-else>
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

const filteredPets = computed(() => {
  return store.pets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchText.value.toLowerCase())
    const matchesSpecies = selectedSpecies.value === '' || pet.species === selectedSpecies.value
    
    return matchesSearch && matchesSpecies
  })
})
</script>

<style scoped>
.home {
  padding: 2rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #fff5f7 100%);
  min-height: 100vh;
}

h1 {
  color: #2d3436;
  font-weight: 700;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.search-filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.form-group {
  flex: 1;
  min-width: 200px;
}

.search-input,
.filter-select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

.search-input:focus,
.filter-select:focus {
  outline: none;
  border-color: #FF6B6B;
  box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
}

.no-pets {
  text-align: center;
  color: #666;
  padding: 3rem;
  font-size: 1.1rem;
  background-color: white;
  border-radius: 12px;
  border: 2px dashed #FFE66D;
}
</style>