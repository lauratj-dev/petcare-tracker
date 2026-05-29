<template>
  <div class="weight-form">
    <h3>Registrar peso</h3>
    <form @submit.prevent="submitWeight" class="weight-input">
      <input
        v-model.number="weightValue"
        type="number"
        step="0.1"
        placeholder="Peso (kg)"
        required
      />
      <input v-model="weightDate" type="date" required />
      <button type="submit" :disabled="petsStore.loading">
        {{ petsStore.loading ? 'Guardando...' : 'Añadir' }}
      </button>
    </form>

    <div v-if="pet.weights && pet.weights.length > 0">
      <div class="chart-container">
        <canvas ref="chartCanvas"></canvas>
      </div>

      <h4>Registro de peso:</h4>
      <div v-for="(weight, idx) in sortedWeights" :key="idx" class="weight-item">
        <span>{{ weight.weightDate }}: {{ weight.weightValue }} kg</span>
        <button @click="deleteWeight(idx)" class="btn-delete-item" type="button">🗑️</button>
      </div>
    </div>

    <div v-else class="no-weights">
      <p>No hay registro de peso aún</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import {
  Chart,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  LineController,
} from 'chart.js'
import { usePetsFirestoreStore } from '../stores/pets-firestore.ts'

Chart.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  LineController,
)

const props = defineProps({
  petId: String,
  pet: Object,
})

const petsStore = usePetsFirestoreStore()
const weightValue = ref('')
const weightDate = ref('')
const chartCanvas = ref(null)
let chartInstance = null

const sortedWeights = computed(() => {
  if (!props.pet.weights) return []
  return [...props.pet.weights].sort((a, b) => a.weightDate.localeCompare(b.weightDate))
})

const renderChart = async () => {
  await nextTick()
  if (!chartCanvas.value || !sortedWeights.value.length) return

  if (chartInstance) {
    chartInstance.destroy()
  }

  chartInstance = new Chart(chartCanvas.value, {
    type: 'line',
    data: {
      labels: sortedWeights.value.map((w) => w.weightDate),
      datasets: [
        {
          label: 'Peso (kg)',
          data: sortedWeights.value.map((w) => w.weightValue),
          borderColor: '#7B2FBE',
          backgroundColor: 'rgba(123, 47, 190, 0.1)',
          borderWidth: 2,
          pointBackgroundColor: '#7B2FBE',
          pointRadius: 5,
          tension: 0.3,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.parsed.y} kg`,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          ticks: { callback: (val) => `${val} kg` },
        },
      },
    },
  })
}

watch(sortedWeights, () => renderChart(), { deep: true })
onMounted(() => renderChart())

const submitWeight = async () => {
  if (!weightValue.value || !weightDate.value) return
  await petsStore.addWeight(props.petId, {
    weightValue: weightValue.value,
    weightDate: weightDate.value,
  })
  weightValue.value = ''
  weightDate.value = ''
}

const deleteWeight = async (idx) => {
  if (confirm('¿Eliminar este registro?')) {
    await petsStore.removeWeight(props.petId, idx)
  }
}
</script>

<style scoped>
.weight-form {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.weight-form h3 {
  color: #7b2fbe;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
}

.weight-input {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.weight-input input {
  flex: 1;
  padding: 0.75rem;
  border: 1.5px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.weight-input input:focus {
  outline: none;
  border-color: #7b2fbe;
  box-shadow: 0 0 0 3px rgba(123, 47, 190, 0.1);
}

.weight-input button {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #7b2fbe, #5b1e8c);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
  white-space: nowrap;
}

.weight-input button:hover:not(:disabled) {
  transform: translateY(-2px);
}

.weight-input button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.weights-list h4 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.weight-item {
  background: #f9f7ff;
  padding: 1rem;
  margin-bottom: 0.75rem;
  border-left: 4px solid #7b2fbe;
  border-radius: 6px;
  font-size: 0.95rem;
  color: #666;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-delete-item {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: transform 0.2s;
}

.btn-delete-item:hover {
  transform: scale(1.2);
}

.no-weights {
  text-align: center;
  padding: 2rem;
  color: #999;
  font-style: italic;
}

.chart-container {
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f9f7ff;
  border-radius: 12px;
}
</style>
S
