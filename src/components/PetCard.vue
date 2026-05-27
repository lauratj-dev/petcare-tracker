<template>
  <router-link :to="`/pet/${id}`" class="pet-card">
    <img v-if="photo" :src="photo" :alt="name" class="pet-image" />
    <div v-else class="pet-image-placeholder">📷</div>
    
    <div class="pet-info">
      <h3>{{ name }}</h3>
      <p><strong>{{ species }}</strong></p>
      <p>{{ age }} años</p>
    </div>
    
    <button @click.prevent="$emit('edit', id)" class="btn-edit">✏️ Editar</button>
  </router-link>
</template>

<script setup>
defineProps({
  id: String,
  name: String,
  species: String,
  age: Number,
  photo: String
})

defineEmits(['edit'])
</script>

<style scoped>
.pet-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.pet-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.pet-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.pet-image-placeholder {
  width: 100%;
  height: 200px;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
}

.pet-info {
  padding: 1rem;
  flex: 1;
}

.pet-info h3 {
  color: #7B2FBE;
  margin: 0 0 0.5rem 0;
  font-size: 1.3rem;
}

.pet-info p {
  margin: 0.25rem 0;
  color: #666;
  font-size: 0.9rem;
}

.btn-edit {
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  background: #7B2FBE;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.btn-edit:hover {
  background: #5B1E8C;
}
</style>