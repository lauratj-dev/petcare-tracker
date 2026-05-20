<template>
  <div class="home">
    <h1>Mis Mascotas</h1>
    
    <PetCard name="Luna" species="Gato" :age="3" />
    <PetCard name="Misu" species="Perro" :age="5" />
  </div>
</template>

<script setup>
import PetCard from '../components/PetCard.vue'
</script>

<style scoped>
.home {
  padding: 20px;
}

h1 {
  color: #333;
}
</style>