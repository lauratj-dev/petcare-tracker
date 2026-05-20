<template>
  <div class="pet-card">
    <h3>{{ name }}</h3>
    <p><strong>Especie:</strong> {{ species }}</p>
    <p><strong>Edad:</strong> {{ age }} años</p>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  species: String,
  age: Number
})
</script>

<style scoped>
.pet-card {
  border: 2px solid #ccc;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  background-color: #f9f9f9;
}

h3 {
  margin-top: 0;
  color: #333;
}

p {
  margin: 5px 0;
  color: #666;
}
</style>