<template>
  <div class="home">
    <!-- Si NO está logueado, mostrar login/registro -->
    <div v-if="!authStore.user" class="auth-section">
      <div class="auth-card">
        <h1>🐾 PetCare Tracker</h1>
        <p>Gestiona la salud de tus mascotas</p>

        <div class="tabs">
          <button
            v-for="tab in ['login', 'register']"
            :key="tab"
            :class="{ active: activeTab === tab }"
            @click="activeTab = tab"
          >
            {{ tab === 'login' ? 'Iniciar sesión' : 'Registrarse' }}
          </button>
        </div>

        <!-- LOGIN -->
        <form v-if="activeTab === 'login'" @submit.prevent="handleLogin" class="form">
          <input v-model="email" type="email" placeholder="Email" required />
          <input v-model="password" type="password" placeholder="Contraseña" required />
          <button type="submit" :disabled="authStore.loading">{{ authStore.loading ? 'Cargando...' : 'Entrar' }}</button>
        </form>

        <!-- REGISTRO -->
        <form v-if="activeTab === 'register'" @submit.prevent="handleRegister" class="form">
          <input v-model="name" type="text" placeholder="Nombre" required />
          <input v-model="email" type="email" placeholder="Email" required />
          <input v-model="password" type="password" placeholder="Contraseña" required />
          <button type="submit" :disabled="authStore.loading">{{ authStore.loading ? 'Cargando...' : 'Registrarse' }}</button>
        </form>

        <p v-if="error" class="error">{{ error }}</p>
      </div>
    </div>

    <!-- Si ESTÁ logueado, mostrar app -->
    <div v-else class="app-section">
      <div class="header">
        <h1>Mis Mascotas</h1>
        <button @click="handleLogout" class="btn-logout">Logout</button>
      </div>

      <!-- FORMULARIO O BOTÓN AÑADIR -->
      <PetForm v-if="showForm" :petToEdit="petToEdit" @added="onAdded" @cancel="onCancel" />
      <button v-else @click="showForm = true" class="btn-add">+ Añadir mascota</button>

      <!-- MASCOTAS -->
      <div v-if="petsStore.pets.length === 0" class="empty">
        <p>No hay mascotas. Añade una para empezar.</p>
      </div>

      <div v-else class="pets-grid">
        <PetCard
          v-for="pet in petsStore.pets"
          :key="pet.id"
          :id="pet.id"
          :name="pet.name"
          :species="pet.species"
          :age="pet.age"
          :photo="pet.photo"
          @edit="onEditRequest"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth.js'
import { usePetsFirestoreStore } from '../stores/pets-firestore.js'
import { auth } from '../firebase.js'
import { onAuthStateChanged } from 'firebase/auth'
import PetCard from '../components/PetCard.vue'
import PetForm from '../components/PetForm.vue'

const authStore = useAuthStore()
const petsStore = usePetsFirestoreStore()

const activeTab = ref('login')
const email = ref('')
const password = ref('')
const name = ref('')
const error = ref('')
const showForm = ref(false)
const petToEdit = ref(null)

onMounted(async () => {
  const checkAuth = setInterval(async () => {
    if (authStore.user) {
      await petsStore.loadPets()
      clearInterval(checkAuth)
    }
  }, 100)
  
  setTimeout(() => {
    clearInterval(checkAuth)
  }, 5000)
})

const handleLogin = async () => {
  error.value = ''
  const success = await authStore.login(email.value, password.value)
  if (!success) {
    error.value = 'Email o contraseña incorrectos'
  } else {
    email.value = ''
    password.value = ''
    await petsStore.loadPets()
  }
}

const handleRegister = async () => {
  error.value = ''
  const success = await authStore.register(email.value, password.value, name.value)
  if (!success) {
    error.value = 'Error al registrarse'
  } else {
    email.value = ''
    password.value = ''
    name.value = ''
    activeTab.value = 'login'
  }
}

const handleLogout = async () => {
  await authStore.logout()
  petsStore.pets = []
}

const onAdded = () => {
  showForm.value = false
  petToEdit.value = null
  petsStore.loadPets()
}

const onCancel = () => {
  showForm.value = false
  petToEdit.value = null
}

const onEditRequest = (id) => {
  petToEdit.value = petsStore.pets.find(p => p.id === id)
  showForm.value = true
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  padding: 2rem;
}

.auth-section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.auth-card {
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

.auth-card h1 {
  text-align: center;
  color: #7B2FBE;
  margin-bottom: 0.5rem;
  font-size: 2rem;
}

.auth-card p {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
}

.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.tabs button {
  flex: 1;
  padding: 0.75rem;
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

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form input {
  padding: 0.75rem;
  border: 1.5px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.form input:focus {
  outline: none;
  border-color: #7B2FBE;
  box-shadow: 0 0 0 3px rgba(123, 47, 190, 0.1);
}

.form button {
  padding: 0.75rem;
  background: linear-gradient(135deg, #7B2FBE, #5B1E8C);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s;
}

.form button:hover:not(:disabled) {
  transform: translateY(-2px);
}

.form button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  color: #dc2626;
  text-align: center;
  margin-top: 1rem;
}

.app-section {
  max-width: 1100px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header h1 {
  color: #7B2FBE;
  font-size: 2rem;
}

.btn-logout {
  padding: 0.75rem 1.5rem;
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-logout:hover {
  transform: translateY(-2px);
}

.btn-add {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #7B2FBE, #5B1E8C);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 2rem;
}

.empty {
  text-align: center;
  padding: 3rem;
  color: #666;
}

.pets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
}
</style>