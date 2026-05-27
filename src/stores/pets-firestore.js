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

  return { pets, loading, addPet, loadPets, deletePet, updatePet }
})