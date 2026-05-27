import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth } from '../firebase.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(false)
  const initialized = ref(false)

 onAuthStateChanged(auth, (currentUser) => {
  user.value = currentUser
  initialized.value = true
})

  const register = async (email, password, name) => {
    loading.value = true
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      user.value = userCredential.user
      return true
    } catch (error) {
      console.error('Error registro:', error.message)
      return false
    } finally {
      loading.value = false
    }
  }

  const login = async (email, password) => {
    loading.value = true
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      user.value = userCredential.user
      return true
    } catch (error) {
      console.error('Error login:', error.message)
      return false
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      user.value = null
    } catch (error) {
      console.error('Error logout:', error.message)
    }
  }

  return { user, loading, initialized, register, login, logout }
})