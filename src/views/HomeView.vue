<template>
  <div class="home">
    <h1>Mis Mascotas</h1>
    
    <PetForm />
    
    <div v-if="store.pets.length === 0" class="no-pets">
      <p>No tienes mascotas aún. ¡Añade una!</p>
    </div>
    
    <div v-else>
      <PetCard 
        v-for="pet in store.pets" 
        :key="pet.id"
        :id="pet.id"
        :name="pet.name"
        :species="pet.species"
        :age="pet.age"
      />
    </div>
  </div>
</template>

<script setup>
import PetCard from '../components/PetCard.vue'
import PetForm from '../components/PetForm.vue'
import { usePetsStore } from '../stores/pets'

const store = usePetsStore()
</script>

<style scoped>
.home {
  padding: 20px;
}

h1 {
  color: #333;
}

.no-pets {
  text-align: center;
  color: #999;
  padding: 40px 20px;
  font-size: 18px;
}
</style>