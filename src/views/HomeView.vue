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
            @click="cambiarTab(tab)"
            type="button"
          >
            {{ tab === 'login' ? 'Iniciar sesión' : 'Registrarse' }}
          </button>
        </div>

        <!-- MENSAJES -->
        <p v-if="authStore.error" class="alert alert-error">{{ authStore.error }}</p>
        <p v-if="mensajeExito" class="alert alert-success">{{ mensajeExito }}</p>

        <!-- LOGIN -->
        <form v-if="activeTab === 'login'" @submit.prevent="handleLogin" class="form">
          <input v-model="email" type="email" placeholder="Email" required autocomplete="email" />
          <input
            v-model="password"
            type="password"
            placeholder="Contraseña"
            required
            autocomplete="current-password"
          />
          <button type="submit" :disabled="authStore.loading">
            {{ authStore.loading ? 'Cargando...' : 'Entrar' }}
          </button>
        </form>

        <!-- REGISTRO -->
        <form v-if="activeTab === 'register'" @submit.prevent="handleRegister" class="form">
          <input v-model="name" type="text" placeholder="Nombre" required autocomplete="name" />
          <input v-model="email" type="email" placeholder="Email" required autocomplete="email" />
          <input
            v-model="password"
            type="password"
            placeholder="Contraseña (mínimo 6 caracteres)"
            required
            minlength="6"
            autocomplete="new-password"
          />
          <button type="submit" :disabled="authStore.loading">
            {{ authStore.loading ? 'Cargando...' : 'Registrarse' }}
          </button>
        </form>
      </div>
    </div>

    <!-- Si ESTÁ logueado, mostrar app -->
    <div v-else class="app-section">
      <div class="header">
        <h1>Mis Mascotas</h1>
        <button @click="handleLogout" class="btn-logout" type="button">Logout</button>
      </div>

      <!-- FORMULARIO O BOTÓN AÑADIR -->
      <PetForm v-if="showForm" :petToEdit="petToEdit" @added="onAdded" @cancel="onCancel" />
      <button v-else @click="showForm = true" class="btn-add" type="button">
        + Añadir mascota
      </button>

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
import { ref, watch } from 'vue'
import { useAuthStore } from '../stores/auth.js'
import { usePetsFirestoreStore } from '../stores/pets-firestore.js'
import PetCard from '../components/PetCard.vue'
import PetForm from '../components/PetForm.vue'

const authStore = useAuthStore()
const petsStore = usePetsFirestoreStore()

const activeTab = ref('login')
const email = ref('')
const password = ref('')
const name = ref('')
const mensajeExito = ref('')
const showForm = ref(false)
const petToEdit = ref(null)

// Carga las mascotas en cuanto Firebase confirma que hay usuario
watch(
  () => authStore.user,
  async (usuario) => {
    if (usuario) {
      await petsStore.loadPets()
    } else {
      petsStore.pets = []
    }
  },
  { immediate: true },
)

const cambiarTab = (tab) => {
  activeTab.value = tab
  authStore.clearError()
  mensajeExito.value = ''
}

const handleLogin = async () => {
  mensajeExito.value = ''
  const success = await authStore.login(email.value, password.value)
  if (success) {
    email.value = ''
    password.value = ''
  }
}

const handleRegister = async () => {
  mensajeExito.value = ''
  const success = await authStore.register(email.value, password.value, name.value)
  if (success) {
    email.value = ''
    password.value = ''
    name.value = ''
    mensajeExito.value = 'Cuenta creada correctamente. ¡Bienvenida!'
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
  petToEdit.value = petsStore.pets.find((p) => p.id === id)
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
  color: #7b2fbe;
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
  background: #7b2fbe;
  color: white;
  border-color: #7b2fbe;
}

.alert {
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  text-align: left;
  line-height: 1.4;
}

.alert-error {
  background: #fee2e2;
  border-left: 4px solid #dc2626;
  color: #991b1b;
}

.alert-success {
  background: #dcfce7;
  border-left: 4px solid #16a34a;
  color: #166534;
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
  border-color: #7b2fbe;
  box-shadow: 0 0 0 3px rgba(123, 47, 190, 0.1);
}

.form button {
  padding: 0.75rem;
  background: linear-gradient(135deg, #7b2fbe, #5b1e8c);
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
  color: #7b2fbe;
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
  background: linear-gradient(135deg, #7b2fbe, #5b1e8c);
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
