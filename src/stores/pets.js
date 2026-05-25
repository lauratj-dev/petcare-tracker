import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const usePetsStore = defineStore('pets', () => {
  const pets = ref([])

  function loadPets() {
    const saved = localStorage.getItem('pets')
    if (saved) {
      pets.value = JSON.parse(saved)
    }
  }

  function addPet(pet) {
    pets.value.push({
      ...pet,
      photo: pet.photo || null,
      visits: [],
      vaccines: [],
      weights: []
    })
  }

  function removePet(id) {
    pets.value = pets.value.filter(p => p.id !== id)
  }

  function updatePet(id, updatedData) {
    const index = pets.value.findIndex(p => p.id === id)
    if (index !== -1) {
      pets.value[index] = {
        ...pets.value[index],
        ...updatedData
      }
    }
  }

  function addVisit(petId, visit) {
    const pet = pets.value.find(p => p.id === petId)
    if (pet) pet.visits.push(visit)
  }

  function addVaccine(petId, vaccine) {
    const pet = pets.value.find(p => p.id === petId)
    if (pet) pet.vaccines.push(vaccine)
  }

  function addWeight(petId, weight) {
    const pet = pets.value.find(p => p.id === petId)
    if (pet) pet.weights.push(weight)
  }

  watch(
    () => pets.value,
    (newPets) => {
      localStorage.setItem('pets', JSON.stringify(newPets))
    },
    { deep: true }
  )

  loadPets()

  return { pets, addPet, removePet, updatePet, addVisit, addVaccine, addWeight }
})