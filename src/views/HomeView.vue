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
  padding: 20px;
}

h1 {
  color: #333;
  font-weight: 700;
  margin-bottom: 20px;
}

.search-filters {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.form-group {
  flex: 1;
  min-width: 200px;
}

.search-input,
.filter-select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

.search-input:focus,
.filter-select:focus {
  outline: none;
  border-color: #4CAF50;
}

.no-pets {
  text-align: center;
  color: #666;
  padding: 30px;
  font-size: 18px;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #ccc;
}
</style>