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

const mensajesError: Record<string, string> = {
  'auth/email-already-in-use': 'Ese correo ya tiene una cuenta. Inicia sesión o usa otro email.',
  'auth/invalid-email': 'El correo no tiene un formato válido.',
  'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
  'auth/missing-password': 'Introduce una contraseña.',
  'auth/user-not-found': 'No existe ninguna cuenta con ese correo.',
  'auth/wrong-password': 'Contraseña incorrecta.',
  'auth/invalid-credential': 'Correo o contraseña incorrectos.',
  'auth/too-many-requests': 'Demasiados intentos. Espera unos minutos e inténtalo de nuevo.',
  'auth/network-request-failed': 'Error de conexión. Comprueba tu internet.',
  'auth/operation-not-allowed': 'El registro por email no está habilitado.',
  'auth/unauthorized-domain': 'Este dominio no está autorizado en Firebase.',
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref<boolean>(false)
  const initialized = ref<boolean>(false)
  const error = ref<string>('')

  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser
    initialized.value = true
  })

  const clearError = (): void => {
    error.value = ''
  }

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    loading.value = true
    error.value = ''
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      user.value = userCredential.user
      return true
    } catch (e: any) {
      error.value = mensajesError[e.code] || 'No se ha podido crear la cuenta. Inténtalo de nuevo.'
      console.error('Error registro:', e.code, e.message)
      return false
    } finally {
      loading.value = false
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    loading.value = true
    error.value = ''
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      user.value = userCredential.user
      return true
    } catch (e: any) {
      error.value = mensajesError[e.code] || 'No se ha podido iniciar sesión. Inténtalo de nuevo.'
      console.error('Error login:', e.code, e.message)
      return false
    } finally {
      loading.value = false
    }
  }

  const logout = async (): Promise<void> => {
    error.value = ''
    try {
      await signOut(auth)
      user.value = null
    } catch (e: any) {
      error.value = 'No se ha podido cerrar sesión.'
      console.error('Error logout:', e.code, e.message)
    }
  }

  return { user, loading, initialized, error, register, login, logout, clearError }
})
