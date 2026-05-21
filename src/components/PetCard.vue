<template>
  <router-link :to="`/pet/${id}`" class="pet-card-link">
    <div class="pet-card">
      <h3>{{ name }}</h3>
      <p><strong>Especie:</strong> {{ species }}</p>
      <p><strong>Edad:</strong> {{ age }} años</p>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  id: Number,
  name: String,
  species: String,
  age: Number
})
</script>

<style scoped>


.pet-card-link {
  text-decoration: none;
  color: inherit;
}

.pet-card {
  border: 2px solid #ccc;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pet-card:hover {
  border-color: #4CAF50;
  background-color: #f0f8f0;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h3 {
  margin-top: 0;
  color: #333;
  font-weight: 700;
}

p {
  margin: 5px 0;
  color: #666;
}
</style>