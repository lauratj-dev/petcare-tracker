<template>
  <div class="detail-page">

    <div v-if="pet">
      <!-- HEADER -->
      <div class="detail-header">
        <router-link to="/" class="back-btn">← Volver</router-link>
        <div class="pet-hero">
          <div class="hero-avatar">{{ speciesEmoji }}</div>
          <div class="hero-info">
            <h1 class="hero-name">{{ pet.name }}</h1>
            <div class="hero-meta">
              <span class="meta-tag">{{ pet.species }}</span>
              <span class="meta-tag">{{ pet.age }} años</span>
            </div>
          </div>
          <button class="btn-delete-hero" @click="showConfirm = true" title="Eliminar mascota">
            🗑️ Eliminar
          </button>
        </div>
      </div>

      <!-- TABS -->
      <div class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="tab-btn"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          {{ tab.icon }} {{ tab.label }}
        </button>
      </div>

      <!-- ── VISITAS ── -->
      <div v-if="activeTab === 'visits'" class="section">
        <form @submit.prevent="addNewVisit" class="record-form">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Fecha</label>
              <input v-model="newVisit.date" type="date" class="form-input" required />
            </div>
            <div class="form-group" style="flex:2">
              <label class="form-label">Motivo</label>
              <input v-model="newVisit.reason" type="text" placeholder="Ej: Revisión anual" class="form-input" required />
            </div>
            <div class="form-group form-action-col">
              <button type="submit" class="btn-add">+ Añadir</button>
            </div>
          </div>
        </form>

        <div v-if="pet.visits.length === 0" class="empty-section">
          <p>📋 No hay visitas registradas aún</p>
        </div>
        <div v-else class="records-list">
          <div v-for="(visit, i) in [...pet.visits].reverse()" :key="i" class="record-item">
            <div class="record-date">{{ visit.date }}</div>
            <div class="record-main">{{ visit.reason }}</div>
          </div>
        </div>
      </div>

      <!-- ── VACUNAS ── -->
      <div v-if="activeTab === 'vaccines'" class="section">
        <form @submit.prevent="addNewVaccine" class="record-form">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Nombre</label>
              <input v-model="newVaccine.name" type="text" placeholder="Ej: Rabia" class="form-input" required />
            </div>
            <div class="form-group">
              <label class="form-label">Fecha aplicación</label>
              <input v-model="newVaccine.date" type="date" class="form-input" required />
            </div>
            <div class="form-group">
              <label class="form-label">Próxima dosis</label>
              <input v-model="newVaccine.nextDate" type="date" class="form-input" required />
            </div>
            <div class="form-group form-action-col">
              <button type="submit" class="btn-add">+ Añadir</button>
            </div>
          </div>
        </form>

        <div v-if="pet.vaccines.length === 0" class="empty-section">
          <p>💉 No hay vacunas registradas aún</p>
        </div>
        <div v-else class="records-list">
          <div v-for="(v, i) in [...pet.vaccines].reverse()" :key="i" class="record-item">
            <div class="record-badge">{{ v.name }}</div>
            <div class="record-dates">
              <span>Aplicada: {{ v.date }}</span>
              <span class="next-dose">Próxima: {{ v.nextDate }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ── PESO ── -->
      <div v-if="activeTab === 'weight'" class="section">
        <form @submit.prevent="addNewWeight" class="record-form">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Fecha</label>
              <input v-model="newWeight.date" type="date" class="form-input" required />
            </div>
            <div class="form-group">
              <label class="form-label">Peso (kg)</label>
              <input v-model.number="newWeight.kg" type="number" step="0.1" placeholder="Ej: 5.5" class="form-input" required />
            </div>
            <div class="form-group form-action-col">
              <button type="submit" class="btn-add">+ Añadir</button>
            </div>
          </div>
        </form>

        <div v-if="pet.weights.length === 0" class="empty-section">
          <p>⚖️ No hay pesos registrados aún</p>
        </div>
        <div v-else class="records-list">
          <div v-for="(w, i) in [...pet.weights].reverse()" :key="i" class="record-item">
            <div class="record-date">{{ w.date }}</div>
            <div class="record-weight">{{ w.kg }} kg</div>
          </div>
        </div>
      </div>

    </div>

    <div v-else class="not-found">
      <p>🐾 Mascota no encontrada</p>
      <router-link to="/" class="back-btn">← Volver al inicio</router-link>
    </div>

    <!-- MODAL BORRAR -->
    <Teleport to="body">
      <div v-if="showConfirm" class="modal-overlay" @click.self="showConfirm = false">
        <div class="modal">
          <div class="modal-icon">🐾</div>
          <h3 class="modal-title">¿Eliminar a {{ pet?.name }}?</h3>
          <p class="modal-desc">Esta acción no se puede deshacer. Se borrarán todas las visitas, vacunas y pesos registrados.</p>
          <div class="modal-actions">
            <button class="btn-cancel" @click="showConfirm = false">Cancelar</button>
            <button class="btn-confirm" @click="confirmDelete">Sí, eliminar</button>
          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePetsStore } from '../stores/pets'

const route = useRoute()
const router = useRouter()
const store = usePetsStore()

const pet = computed(() => store.pets.find(p => p.id === parseInt(route.params.id)))

const speciesEmoji = computed(() => {
  const map = { Perro: '🐕', Gato: '🐈', Conejo: '🐰', Otro: '🐾' }
  return map[pet.value?.species] || '🐾'
})

const tabs = [
  { id: 'visits',   label: 'Visitas',  icon: '📋' },
  { id: 'vaccines', label: 'Vacunas',  icon: '💉' },
  { id: 'weight',   label: 'Peso',     icon: '⚖️' },
]
const activeTab = ref('visits')
const showConfirm = ref(false)

const newVisit   = ref({ date: '', reason: '' })
const newVaccine = ref({ name: '', date: '', nextDate: '' })
const newWeight  = ref({ date: '', kg: null })

function confirmDelete() {
  store.removePet(pet.value.id)
  showConfirm.value = false
  router.push('/')
}

function addNewVisit() {
  if (pet.value) {
    store.addVisit(pet.value.id, { ...newVisit.value })
    newVisit.value = { date: '', reason: '' }
  }
}

function addNewVaccine() {
  if (pet.value) {
    store.addVaccine(pet.value.id, { ...newVaccine.value })
    newVaccine.value = { name: '', date: '', nextDate: '' }
  }
}

function addNewWeight() {
  if (pet.value) {
    store.addWeight(pet.value.id, { ...newWeight.value })
    newWeight.value = { date: '', kg: null }
  }
}
</script>

<style scoped>
.detail-page {
  padding: 2.5rem 2rem;
  max-width: 860px;
  margin: 0 auto;
}

/* BACK */
.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--purple-mid);
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  transition: all var(--transition);
  padding: 0.4rem 0.75rem;
  border-radius: var(--radius-sm);
  background: var(--purple-ghost);
  border: 1.5px solid var(--border-soft);
}

.back-btn:hover {
  background: var(--purple-soft);
  transform: translateX(-3px);
}

/* HERO */
.pet-hero {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: linear-gradient(135deg, var(--purple-main) 0%, var(--purple-deep) 100%);
  padding: 2rem;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.hero-avatar {
  width: 80px;
  height: 80px;
  border-radius: var(--radius-lg);
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  flex-shrink: 0;
  border: 2px solid rgba(255,255,255,0.3);
}

.hero-info {
  flex: 1;
}

.hero-name {
  font-size: 2rem;
  font-weight: 900;
  color: white;
  margin-bottom: 0.5rem;
  letter-spacing: -0.5px;
}

.hero-meta {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.meta-tag {
  background: rgba(255,255,255,0.2);
  color: white;
  padding: 0.3rem 0.9rem;
  border-radius: 99px;
  font-size: 0.85rem;
  font-weight: 700;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255,255,255,0.25);
}

/* BOTÓN ELIMINAR EN HERO */
.btn-delete-hero {
  background: rgba(255, 255, 255, 0.15);
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.6rem 1.1rem;
  border-radius: var(--radius-md);
  font-weight: 700;
  font-size: 0.88rem;
  cursor: pointer;
  transition: all var(--transition);
  backdrop-filter: blur(4px);
  margin-left: auto;
}

.btn-delete-hero:hover {
  background: rgba(239, 68, 68, 0.7);
  border-color: rgba(239, 68, 68, 0.8);
  transform: translateY(-2px);
}

/* TABS */
.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  background: white;
  padding: 0.4rem;
  border-radius: var(--radius-lg);
  border: 1.5px solid var(--border-soft);
  box-shadow: var(--shadow-sm);
}

.tab-btn {
  flex: 1;
  padding: 0.65rem 1rem;
  border: none;
  border-radius: var(--radius-md);
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--text-muted);
  background: transparent;
  transition: all var(--transition);
}

.tab-btn:hover {
  background: var(--purple-ghost);
  color: var(--purple-deep);
}

.tab-btn.active {
  background: linear-gradient(135deg, var(--purple-main), var(--purple-deep));
  color: white;
  box-shadow: var(--shadow-sm);
}

/* SECTION */
.section {
  background: white;
  border: 1.5px solid var(--border-soft);
  border-radius: var(--radius-lg);
  padding: 1.75rem;
  box-shadow: var(--shadow-sm);
}

/* FORM */
.record-form {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1.5px solid var(--border-soft);
}

.form-row {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  align-items: flex-end;
}

.form-group {
  flex: 1;
  min-width: 140px;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-action-col {
  flex: 0 0 auto;
  min-width: unset;
}

.form-label {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text-body);
}

.form-input {
  padding: 0.7rem 0.9rem;
  border: 1.5px solid var(--border-soft);
  border-radius: var(--radius-md);
  font-size: 0.92rem;
  color: var(--text-dark);
  background: var(--bg-page);
  transition: all var(--transition);
  width: 100%;
}

.form-input:focus {
  outline: none;
  border-color: var(--purple-mid);
  background: white;
  box-shadow: 0 0 0 3px rgba(123, 47, 190, 0.1);
}

.btn-add {
  padding: 0.7rem 1.25rem;
  background: linear-gradient(135deg, var(--purple-main), var(--purple-deep));
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-weight: 700;
  font-size: 0.9rem;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition);
  white-space: nowrap;
}

.btn-add:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* RECORDS */
.records-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.record-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--purple-ghost);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--purple-mid);
  transition: all var(--transition);
}

.record-item:hover {
  transform: translateX(3px);
  border-left-color: var(--purple-deep);
  background: var(--purple-soft);
}

.record-date {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text-muted);
  white-space: nowrap;
  min-width: 90px;
}

.record-main {
  font-weight: 600;
  color: var(--text-dark);
  font-size: 0.95rem;
}

.record-badge {
  background: linear-gradient(135deg, var(--purple-main), var(--purple-deep));
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 99px;
  font-size: 0.82rem;
  font-weight: 700;
  white-space: nowrap;
}

.record-dates {
  display: flex;
  gap: 1.25rem;
  font-size: 0.88rem;
  color: var(--text-body);
  font-weight: 600;
  flex-wrap: wrap;
}

.next-dose {
  color: var(--pink-accent);
}

.record-weight {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--purple-deep);
}

.empty-section {
  text-align: center;
  padding: 2.5rem;
  color: var(--text-muted);
  font-size: 0.95rem;
  font-style: italic;
}

.not-found {
  text-align: center;
  padding: 4rem 2rem;
}

/* MODAL */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(30, 10, 60, 0.45);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal {
  background: white;
  border-radius: var(--radius-xl);
  padding: 2.5rem 2rem;
  max-width: 400px;
  width: 100%;
  text-align: center;
  box-shadow: var(--shadow-lg);
  animation: modal-in 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes modal-in {
  from { opacity: 0; transform: scale(0.9) translateY(10px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}

.modal-icon { font-size: 2.5rem; margin-bottom: 1rem; }

.modal-title {
  font-size: 1.3rem;
  font-weight: 900;
  color: var(--text-dark);
  margin-bottom: 0.75rem;
}

.modal-desc {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
}

.btn-cancel {
  flex: 1;
  padding: 0.75rem;
  border: 1.5px solid var(--border-soft);
  border-radius: var(--radius-md);
  background: white;
  color: var(--text-body);
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all var(--transition);
}

.btn-cancel:hover {
  background: var(--purple-ghost);
  border-color: var(--border-mid);
}

.btn-confirm {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all var(--transition);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.25);
}

.btn-confirm:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(220, 38, 38, 0.35);
}
</style>