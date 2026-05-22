<template>
  <div class="pet-card-wrapper">
    <router-link :to="`/pet/${id}`" class="pet-card">
      <div class="pet-avatar">
        <span class="pet-emoji">{{ speciesEmoji }}</span>
      </div>
      <div class="pet-info">
        <h3 class="pet-name">{{ name }}</h3>
        <p class="pet-species">{{ species }}</p>
        <p class="pet-age">{{ age }} años</p>
      </div>
      <div class="pet-arrow">→</div>
    </router-link>

    <!-- ACCIONES HOVER -->
    <div class="card-actions">
      <button class="btn-action btn-edit" @click.prevent="emit('edit', id)" title="Editar mascota">✏️</button>
      <button class="btn-action btn-delete" @click.prevent="showConfirm = true" title="Eliminar mascota">✕</button>
    </div>

    <!-- MODAL BORRAR -->
    <Teleport to="body">
      <div v-if="showConfirm" class="modal-overlay" @click.self="showConfirm = false">
        <div class="modal">
          <div class="modal-icon">🐾</div>
          <h3 class="modal-title">¿Eliminar a {{ name }}?</h3>
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
import { ref, computed } from 'vue'
import { usePetsStore } from '../stores/pets'

const props = defineProps({
  id: Number,
  name: String,
  species: String,
  age: Number,
})

const emit = defineEmits(['edit'])

const store = usePetsStore()
const showConfirm = ref(false)

const speciesEmoji = computed(() => {
  const map = { Perro: '🐕', Gato: '🐈', Conejo: '🐰', Otro: '🐾' }
  return map[props.species] || '🐾'
})

function confirmDelete() {
  store.removePet(props.id)
  showConfirm.value = false
}
</script>

<style scoped>
.pet-card-wrapper {
  position: relative;
}

.pet-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.25rem 1.5rem;
  background: white;
  border-radius: var(--radius-lg);
  border: 1.5px solid var(--border-soft);
  text-decoration: none;
  cursor: pointer;
  transition: all var(--transition);
  box-shadow: var(--shadow-sm);
  position: relative;
  overflow: hidden;
  width: 100%;
}

.pet-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--purple-ghost), transparent);
  opacity: 0;
  transition: opacity var(--transition);
}

.pet-card:hover {
  transform: translateY(-4px);
  border-color: var(--purple-mid);
  box-shadow: var(--shadow-md), 0 0 0 3px rgba(123, 47, 190, 0.08);
}

.pet-card:hover::before {
  opacity: 1;
}

.pet-avatar {
  width: 60px;
  height: 60px;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, var(--purple-soft), var(--pink-light));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  flex-shrink: 0;
  transition: transform var(--transition);
  position: relative;
  z-index: 1;
}

.pet-card:hover .pet-avatar {
  transform: scale(1.08) rotate(-3deg);
}

.pet-info {
  flex: 1;
  position: relative;
  z-index: 1;
}

.pet-name {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--text-dark);
  margin-bottom: 0.2rem;
}

.pet-species {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--purple-mid);
  margin-bottom: 0.1rem;
}

.pet-age {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-weight: 600;
}

.pet-arrow {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--purple-main), var(--purple-deep));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
  transition: all var(--transition);
  position: relative;
  z-index: 1;
  box-shadow: var(--shadow-sm);
}

.pet-card:hover .pet-arrow {
  transform: translateX(4px);
  box-shadow: var(--shadow-md);
}

/* ACCIONES */
.card-actions {
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  display: flex;
  gap: 0.3rem;
  opacity: 0;
  transition: opacity var(--transition);
  z-index: 2;
}

.pet-card-wrapper:hover .card-actions {
  opacity: 1;
}

.btn-action {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: transparent;
  font-size: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition);
}

.btn-edit:hover {
  background: var(--purple-soft);
  transform: scale(1.15);
}

.btn-delete:hover {
  background: #fee2e2;
  color: #dc2626;
  transform: scale(1.15);
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