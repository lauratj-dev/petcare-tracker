import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth } from '../firebase.js'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import type { User } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref<boolean>(false)
  const initialized = ref<boolean>(false)

  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser
    initialized.value = true
  })

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    loading.value = true
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      user.value = userCredential.user
      return true
    } catch (error: any) {
      console.error('Error registro:', error.message)
      return false
    } finally {
      loading.value = false
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    loading.value = true
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      user.value = userCredential.user
      return true
    } catch (error: any) {
      console.error('Error login:', error.message)
      return false
    } finally {
      loading.value = false
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth)
      user.value = null
    } catch (error: any) {
      console.error('Error logout:', error.message)
    }
  }

  return { user, loading, initialized, register, login, logout }
})
