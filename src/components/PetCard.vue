<template>
  <router-link :to="`/pet/${id}`" class="pet-card">
    <div class="pet-icon">🐾</div>
    <div class="pet-info">
      <h3>{{ name }}</h3>
      <p class="species">{{ species }}</p>
      <p class="age">{{ age }} años</p>
    </div>
    <div class="arrow">→</div>
  </router-link>
</template>

<script setup>
defineProps({
  id: Number,
  name: String,
  species: String,
  age: Number,
})
</script>

<style scoped>
.pet-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 2px solid #e0e0e0;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
}

.pet-card:hover {
  transform: translateY(-4px);
  border-color: #FF6B6B;
  box-shadow: 0 8px 16px rgba(255, 107, 107, 0.15);
}

.pet-icon {
  font-size: 2.5rem;
  min-width: 60px;
  text-align: center;
}

.pet-info {
  flex: 1;
}

.pet-info h3 {
  margin: 0;
  color: #2d3436;
  font-size: 1.3rem;
  font-weight: 600;
}

.species {
  margin: 0.25rem 0 0 0;
  color: #FF6B6B;
  font-size: 0.9rem;
  font-weight: 500;
}

.age {
  margin: 0.25rem 0 0 0;
  color: #999;
  font-size: 0.85rem;
}

.arrow {
  color: #FF6B6B;
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.pet-card:hover .arrow {
  transform: translateX(4px);
}
</style>