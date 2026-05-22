<template>
  <div class="app-layout">
    <!-- SIDEBAR -->
    <aside class="sidebar">
      <div class="sidebar-brand">
        <div class="brand-icon">🐾</div>
        <div class="brand-text">
          <span class="brand-name">PetCare</span>
          <span class="brand-sub">Tracker</span>
        </div>
      </div>

      <nav class="sidebar-nav">
        <RouterLink to="/" class="nav-item" :class="{ active: route.path === '/' }">
          <span class="nav-icon">🏠</span>
          <span>Inicio</span>
        </RouterLink>
        <RouterLink to="/about" class="nav-item" :class="{ active: route.path === '/about' }">
          <span class="nav-icon">ℹ️</span>
          <span>Acerca de</span>
        </RouterLink>
      </nav>

      <div class="sidebar-footer">
        <p class="sidebar-tagline">Porque su bienestar<br>merece lo mejor 🤍</p>
      </div>
    </aside>

    <!-- MAIN CONTENT -->
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
  background: var(--bg-page);
}

/* ── SIDEBAR ── */
.sidebar {
  width: var(--sidebar-w);
  min-height: 100vh;
  background: linear-gradient(180deg, #ffffff 0%, var(--bg-sidebar) 100%);
  border-right: 1.5px solid var(--border-soft);
  display: flex;
  flex-direction: column;
  padding: 2rem 1.25rem;
  position: sticky;
  top: 0;
  height: 100vh;
  box-shadow: 2px 0 16px rgba(91, 30, 140, 0.06);
  flex-shrink: 0;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1.5px solid var(--border-soft);
}

.brand-icon {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, var(--purple-main), var(--purple-deep));
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  box-shadow: var(--shadow-md);
  flex-shrink: 0;
}

.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.brand-name {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--purple-deep);
  letter-spacing: -0.3px;
}

.brand-sub {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--purple-mid);
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--text-body);
  transition: all var(--transition);
}

.nav-item:hover {
  background: var(--purple-soft);
  color: var(--purple-deep);
  transform: translateX(3px);
}

.nav-item.active {
  background: linear-gradient(135deg, var(--purple-main), var(--purple-deep));
  color: white;
  box-shadow: var(--shadow-md);
}

.nav-item.active .nav-icon {
  filter: brightness(2);
}

.nav-icon {
  font-size: 1.1rem;
  width: 22px;
  text-align: center;
}

.sidebar-footer {
  padding-top: 1.5rem;
  border-top: 1.5px solid var(--border-soft);
}

.sidebar-tagline {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-style: italic;
  line-height: 1.5;
  text-align: center;
}

/* ── MAIN ── */
.main-content {
  flex: 1;
  min-width: 0;
  overflow-y: auto;
}

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .sidebar {
    width: 70px;
    padding: 1.5rem 0.75rem;
  }
  .brand-text,
  .sidebar-tagline,
  .nav-item span:last-child {
    display: none;
  }
  .nav-item {
    justify-content: center;
    padding: 0.75rem;
  }
  .sidebar-brand {
    justify-content: center;
  }
  .brand-icon {
    margin: 0;
  }
}
</style>
