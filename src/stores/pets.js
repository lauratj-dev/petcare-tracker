import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePetsStore = defineStore('pets', () => {
  const pets = ref([])

  function addPet(pet) {
    pets.value.push(pet)
  }

  function removePet(id) {
    pets.value = pets.value.filter(p => p.id !== id)
  }

  return { pets, addPet, removePet }
})