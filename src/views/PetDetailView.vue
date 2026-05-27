<template>
  <div class="pet-detail" v-if="pet">
    <router-link to="/" class="back-btn">← Volver</router-link>
    
    <div class="pet-header">
      <img v-if="pet.photo" :src="pet.photo" :alt="pet.name" class="pet-photo" />
      <div class="pet-info">
        <h1>{{ pet.name }}</h1>
        <p><strong>Especie:</strong> {{ pet.species }}</p>
        <p><strong>Edad:</strong> {{ pet.age }} años</p>
      </div>
    </div>

    <div class="tabs">
      <button
        v-for="tab in ['vacunas', 'visitas', 'peso']"
        :key="tab"
        :class="{ active: activeTab === tab }"
        @click="activeTab = tab"
      >
        {{ tab.charAt(0).toUpperCase() + tab.slice(1) }}
      </button>
    </div>

    <div class="tab-content">
      <VaccineForm v-if="activeTab === 'vacunas'" :petId="pet.id" :pet="pet" />
      <div v-else-if="activeTab === 'visitas'" class="placeholder">Próximamente: Visitas al veterinario</div>
      <div v-else-if="activeTab === 'peso'" class="placeholder">Próximamente: Gráfica de peso</div>
    </div>

    <button @click="deletePet" class="btn-delete">Eliminar mascota</button>
  </div>
  <div v-else class="loading">Cargando...</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePetsFirestoreStore } from '../stores/pets-firestore.js'
import VaccineForm from '../components/VaccineForm.vue'

const route = useRoute()
const router = useRouter()
const petsStore = usePetsFirestoreStore()

const activeTab = ref('vacunas')

const pet = computed(() => {
  const petId = route.params.id
  return petsStore.pets.find(p => p.id === petId)
})

onMounted(async () => {
  if (petsStore.pets.length === 0) {
    await petsStore.loadPets()
  }
})

const deletePet = async () => {
  if (confirm('¿Eliminar esta mascota?')) {
    await petsStore.deletePet(route.params.id)
    router.push('/')
  }
}
</script>

<style scoped>
.pet-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.back-btn {
  color: #7B2FBE;
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 1rem;
  display: inline-block;
}

.back-btn:hover {
  text-decoration: underline;
}

.pet-header {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.pet-photo {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

.pet-info h1 {
  color: #7B2FBE;
  margin-bottom: 1rem;
  font-size: 2rem;
}

.pet-info p {
  margin: 0.5rem 0;
  color: #666;
}

.tabs {
  display: flex;
  gap: 0.5rem;
  margin: 2rem 0;
}

.tabs button {
  padding: 0.75rem 1.5rem;
  border: 2px solid #ddd;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.tabs button.active {
  background: #7B2FBE;
  color: white;
  border-color: #7B2FBE;
}

.tab-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.placeholder {
  text-align: center;
  padding: 3rem;
  color: #999;
}

.btn-delete {
  width: 100%;
  padding: 1rem;
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}

.btn-delete:hover {
  background: #b91c1c;
}

.loading {
  text-align: center;
  padding: 3rem;
  color: #999;
}
</style>