<template>
  <div class="about-page">

    <div class="about-hero">
      <div class="hero-icon">🐾</div>
      <h1 class="hero-title">PetCare Tracker</h1>
      <p class="hero-sub">Tu mascota, su salud, <strong>bajo control</strong></p>
    </div>

    <div class="features-grid">
      <div class="feature-card" v-for="f in features" :key="f.title">
        <div class="feature-icon">{{ f.icon }}</div>
        <h3 class="feature-title">{{ f.title }}</h3>
        <p class="feature-desc">{{ f.desc }}</p>
      </div>
    </div>

    <div class="stack-section">
      <h2 class="stack-title">Tecnologías</h2>
      <div class="stack-chips">
        <span class="chip" v-for="t in stack" :key="t">{{ t }}</span>
      </div>
    </div>

    <p class="footer-tagline">Porque su bienestar merece lo mejor 🤍</p>

  </div>
</template>

<script setup>
const features = [
  { icon: '🐕', title: 'Gestiona tus mascotas', desc: 'Registra todos tus compañeros en un solo lugar con sus datos esenciales.' },
  { icon: '📋', title: 'Visitas al veterinario', desc: 'Lleva un historial completo de cada visita con fecha y motivo.' },
  { icon: '💉', title: 'Vacunas al día', desc: 'Controla cuándo se aplicó cada vacuna y cuándo toca la siguiente dosis.' },
  { icon: '⚖️', title: 'Control de peso', desc: 'Registra la evolución del peso a lo largo del tiempo.' },
  { icon: '🔍', title: 'Búsqueda y filtros', desc: 'Encuentra rápidamente cualquier mascota por nombre o especie.' },
  { icon: '💾', title: 'Guardado automático', desc: 'Todos los datos se guardan en local, sin necesidad de cuenta.' },
]

const stack = ['Vue 3', 'Pinia', 'Vue Router', 'Vite', 'Vitest', 'Git', 'GitHub Actions', 'Docker']
</script>

<style scoped>
.about-page {
  padding: 2.5rem 2rem;
  max-width: 860px;
  margin: 0 auto;
}

/* HERO */
.about-hero {
  text-align: center;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, var(--purple-main), var(--purple-deep));
  border-radius: var(--radius-xl);
  margin-bottom: 2.5rem;
  box-shadow: var(--shadow-lg);
}

.hero-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero-title {
  font-size: 2.2rem;
  font-weight: 900;
  color: white;
  letter-spacing: -0.5px;
  margin-bottom: 0.5rem;
}

.hero-sub {
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.05rem;
  font-weight: 500;
}

.hero-sub strong {
  color: white;
  font-weight: 800;
}

/* FEATURES */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}

.feature-card {
  background: white;
  border: 1.5px solid var(--border-soft);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition);
}

.feature-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  border-color: var(--purple-light);
}

.feature-icon {
  font-size: 1.8rem;
  margin-bottom: 0.75rem;
}

.feature-title {
  font-size: 1rem;
  font-weight: 800;
  color: var(--text-dark);
  margin-bottom: 0.4rem;
}

.feature-desc {
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.5;
}

/* STACK */
.stack-section {
  background: white;
  border: 1.5px solid var(--border-soft);
  border-radius: var(--radius-lg);
  padding: 1.75rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-sm);
}

.stack-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--text-dark);
  margin-bottom: 1rem;
}

.stack-chips {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.chip {
  background: var(--purple-ghost);
  border: 1.5px solid var(--border-soft);
  color: var(--purple-deep);
  padding: 0.4rem 0.9rem;
  border-radius: 99px;
  font-size: 0.85rem;
  font-weight: 700;
  transition: all var(--transition);
}

.chip:hover {
  background: var(--purple-soft);
  border-color: var(--purple-mid);
}

/* FOOTER */
.footer-tagline {
  text-align: center;
  color: var(--text-muted);
  font-size: 0.9rem;
  font-style: italic;
}
</style>
