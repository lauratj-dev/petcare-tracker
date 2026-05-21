import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const usePetsStore = defineStore('pets', () => {
  const pets = ref([])

  // Cargar datos al iniciar
  function loadPets() {
    const saved = localStorage.getItem('pets')
    if (saved) {
      pets.value = JSON.parse(saved)
    }
  }

  function addPet(pet) {
    pets.value.push(pet)
  }

  function removePet(id) {
    pets.value = pets.value.filter(p => p.id !== id)
  }

  // Guardar cada vez que cambia
  watch(
    () => pets.value,
    (newPets) => {
      localStorage.setItem('pets', JSON.stringify(newPets))
    },
    { deep: true }
  )

  // Cargar al iniciar la app
  loadPets()

  return { pets, addPet, removePet }
})