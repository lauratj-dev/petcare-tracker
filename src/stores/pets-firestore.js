import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db } from '../firebase.js'
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { useAuthStore } from './auth.js'

export const usePetsFirestoreStore = defineStore('petsFirestore', () => {
  const pets = ref([])
  const loading = ref(false)

  const addPet = async (petData) => {
    const authStore = useAuthStore()
    if (!authStore.user) return false
    
    loading.value = true
    try {
      const docRef = await addDoc(collection(db, 'pets'), {
        ...petData,
        userId: authStore.user.uid,
        createdAt: new Date()
      })
      pets.value.push({ id: docRef.id, ...petData })
      return true
    } catch (error) {
      console.error('Error añadiendo mascota:', error)
      return false
    } finally {
      loading.value = false
    }
  }

  const loadPets = async () => {
    const authStore = useAuthStore()
    if (!authStore.user) return
    
    loading.value = true
    try {
      const q = query(collection(db, 'pets'), where('userId', '==', authStore.user.uid))
      const snapshot = await getDocs(q)
      pets.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
      console.error('Error cargando mascotas:', error)
    } finally {
      loading.value = false
    }
  }

  const deletePet = async (petId) => {
    loading.value = true
    try {
      await deleteDoc(doc(db, 'pets', petId))
      pets.value = pets.value.filter(p => p.id !== petId)
      return true
    } catch (error) {
      console.error('Error eliminando mascota:', error)
      return false
    } finally {
      loading.value = false
    }
  }

  const updatePet = async (petId, updates) => {
    loading.value = true
    try {
      await updateDoc(doc(db, 'pets', petId), updates)
      const index = pets.value.findIndex(p => p.id === petId)
      if (index !== -1) {
        pets.value[index] = { ...pets.value[index], ...updates }
      }
      return true
    } catch (error) {
      console.error('Error actualizando mascota:', error)
      return false
    } finally {
      loading.value = false
    }
  }

  const addVaccine = async (petId, vaccine) => {
    loading.value = true
    try {
      await updateDoc(doc(db, 'pets', petId), {
        vaccines: arrayUnion(vaccine)
      })
      const pet = pets.value.find(p => p.id === petId)
      if (pet) {
        pet.vaccines = pet.vaccines || []
        pet.vaccines.push(vaccine)
      }
      return true
    } catch (error) {
      console.error('Error añadiendo vacuna:', error)
      return false
    } finally {
      loading.value = false
    }
  }

  const addVisit = async (petId, visit) => {
    loading.value = true
    try {
      await updateDoc(doc(db, 'pets', petId), {
        visits: arrayUnion(visit)
      })
      const pet = pets.value.find(p => p.id === petId)
      if (pet) {
        pet.visits = pet.visits || []
        pet.visits.push(visit)
      }
      return true
    } catch (error) {
      console.error('Error añadiendo visita:', error)
      return false
    } finally {
      loading.value = false
    }
  }

  const removeVaccine = async (petId, vaccineIndex) => {
    loading.value = true
    try {
      const pet = pets.value.find(p => p.id === petId)
      if (pet && pet.vaccines) {
        const newVaccines = pet.vaccines.filter((_, idx) => idx !== vaccineIndex)
        await updateDoc(doc(db, 'pets', petId), {
          vaccines: newVaccines
        })
        pet.vaccines = newVaccines
      }
      return true
    } catch (error) {
      console.error('Error eliminando vacuna:', error)
      return false
    } finally {
      loading.value = false
    }
  }

  const removeVisit = async (petId, visitIndex) => {
    loading.value = true
    try {
      const pet = pets.value.find(p => p.id === petId)
      if (pet && pet.visits) {
        const newVisits = pet.visits.filter((_, idx) => idx !== visitIndex)
        await updateDoc(doc(db, 'pets', petId), {
          visits: newVisits
        })
        pet.visits = newVisits
      }
      return true
    } catch (error) {
      console.error('Error eliminando visita:', error)
      return false
    } finally {
      loading.value = false
    }
  }

  const removeWeight = async (petId, weightIndex) => {
    loading.value = true
    try {
      const pet = pets.value.find(p => p.id === petId)
      if (pet && pet.weights) {
        const newWeights = pet.weights.filter((_, idx) => idx !== weightIndex)
        await updateDoc(doc(db, 'pets', petId), {
          weights: newWeights
        })
        pet.weights = newWeights
      }
      return true
    } catch (error) {
      console.error('Error eliminando peso:', error)
      return false
    } finally {
      loading.value = false
    }
  }
const addWeight = async (petId, weight) => {
  loading.value = true
  try {
    await updateDoc(doc(db, 'pets', petId), {
      weights: arrayUnion(weight)
    })
    const pet = pets.value.find(p => p.id === petId)
    if (pet) {
      pet.weights = pet.weights || []
      pet.weights.push(weight)
    }
    return true
  } catch (error) {
    console.error('Error añadiendo peso:', error)
    return false
  } finally {
    loading.value = false
  }
}
  return { pets, loading, addPet, loadPets, deletePet, updatePet, addVaccine, addVisit, removeVaccine, removeVisit, removeWeight, addWeight }
})