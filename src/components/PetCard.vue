<template>
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
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: Number,
  name: String,
  species: String,
  age: Number,
})

const speciesEmoji = computed(() => {
  const map = { Perro: '🐕', Gato: '🐈', Conejo: '🐰', Otro: '🐾' }
  return map[props.species] || '🐾'
})
</script>

<style scoped>
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
</style>