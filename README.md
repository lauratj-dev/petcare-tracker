# PetCare Tracker

Una aplicación web para gestionar y dar seguimiento a tus mascotas: registrar datos básicos, visitas al veterinario, vacunas y peso.

## 🚀 Demo en vivo

**[Ver la app aquí](https://petcare-tracker-one.vercel.app)**

## ✨ Características

- ✅ Registra tus mascotas (nombre, especie, edad)
- ✅ Guarda historial de visitas al veterinario
- ✅ Registra vacunas y próximas dosis
- ✅ Sigue el peso de tus mascotas
- ✅ Busca mascotas por nombre
- ✅ Filtra por especie
- ✅ Datos persistentes (se guardan en tu navegador)

## 🛠️ Tecnologías

- **Frontend:** Vue 3 + Composition API
- **Estado:** Pinia
- **Enrutamiento:** Vue Router
- **Estilos:** Sass
- **Testing:** Vitest
- **Build:** Vite
- **Deploy:** Vercel
- **CI/CD:** GitHub Actions
- **Containerización:** Docker

## 📦 Instalación local

1. **Clona el repositorio:**
```bash
   git clone https://github.com/lauratj-dev/petcare-tracker.git
   cd petcare-tracker
```

2. **Instala dependencias:**
```bash
   npm install
```

3. **Arranca el servidor de desarrollo:**
```bash
   npm run dev
```

4. **Abre en tu navegador:**
http://localhost:5173/

## 🧪 Tests

Para ejecutar los tests automáticos:

```bash
npm run test:unit
```

## 🐳 Docker

Para ejecutar con Docker:

```bash
docker build -t petcare-tracker .
docker run -p 8080:3000 petcare-tracker
```

Luego abre: `http://localhost:8080`

## 📁 Estructura del proyecto
src/
├── components/          # Componentes Vue reutilizables
│   ├── PetCard.vue     # Tarjeta de mascota
│   └── PetForm.vue     # Formulario para añadir mascotas
├── views/              # Páginas principales
│   ├── HomeView.vue    # Página de inicio (lista de mascotas)
│   └── PetDetailView.vue # Página de detalle de mascota
├── stores/             # Estado global (Pinia)
│   └── pets.js         # Store de mascotas
├── router/             # Configuración de rutas
│   └── index.js
└── assets/
└── styles/         # Estilos globales y variables Sass

## 🎯 Roadmap - Próximas mejoras

Este proyecto está en **desarrollo activo**. Aquí están las próximas fases planificadas:

### 🎨 Fase 1: Diseño y UX (En progreso)
Mejorar la interfaz y experiencia del usuario.

- [ ] Tema visual mejorado con paleta de colores cálida
- [ ] Animaciones suaves al interactuar (Vue Transitions)
- [ ] Avatares/iconos personalizados según especie
- [ ] Modo oscuro/claro con toggle
- [ ] Toast notifications (mensajes de éxito/error)
- [ ] Responsive 100% (móvil, tablet, desktop)
- [ ] Logo y favicon personalizado

**Tecnologías:** CSS Animations, Vue Transitions, Tailwind CSS

---

### ⚡ Fase 2: Funcionalidades nuevas
Expandir las capacidades de la app.

- [ ] Botón de borrar mascota (con confirmación)
- [ ] Editar datos de la mascota
- [ ] Upload de foto para cada mascota
- [ ] Gráfica de evolución de peso (Chart.js)
- [ ] Recordatorios de vacunas (alertas)
- [ ] Exportar informe a PDF
- [ ] Importar/Exportar datos (JSON backup)

**Tecnologías:** Chart.js, jsPDF, File API

---

### 🔐 Fase 3: Backend y Autenticación ⭐ PRÓXIMO GRAN PASO
Transformar en una app full-stack real.

- [ ] Backend con Node.js + Express
- [ ] Base de datos MongoDB
- [ ] API REST completa (CRUD)
- [ ] Autenticación de usuarios (JWT)
- [ ] Cada usuario ve solo sus mascotas
- [ ] Deploy del backend (Render/Railway)

**Tecnologías:** Node.js, Express, MongoDB, JWT, REST API

---

### 🧪 Fase 4: Calidad profesional
Estándares de código y testing enterprise.

- [ ] Aumentar cobertura de tests (80%+)
- [ ] Tests E2E con Cypress
- [ ] Migración a TypeScript
- [ ] Pre-commit hooks (husky)
- [ ] Documentación de API (Swagger)
- [ ] Logs estructurados en backend

**Tecnologías:** Cypress, TypeScript, Swagger, Winston

---

### 🚀 Fase 5: DevOps y producción
Despliegue profesional y observabilidad.

- [ ] GitHub Actions completo (CI/CD avanzado)
- [ ] Docker Compose (full stack containerizado)
- [ ] Monitoring con Sentry
- [ ] Analytics con Vercel Analytics
- [ ] PWA (instalable en móvil)
- [ ] Custom domain

**Tecnologías:** Docker Compose, Sentry, PWA, GitHub Actions

---

## 📊 Estado actual

| Aspecto | Estado |
|---------|--------|
| Frontend | ✅ Funcional y desplegado |
| Backend | ⏳ Próximamente |
| Tests | ✅ Tests unitarios (4/4) |
| CI/CD | ✅ GitHub Actions configurado |
| Docker | ✅ Dockerfile presente |
| Documentación | ✅ README profesional |
| Autenticación | ⏳ Próximamente |
| Base de datos real | ⏳ Próximamente |

---

## 💡 Cómo contribuir

¿Quieres seguir el desarrollo? Las próximas mejoras se anunciarán en GitHub Issues.

Puedes:
- ⭐ Star el repo si te gusta
- 👀 Watch para seguir actualizaciones
- 💬 Comentar sugerencias en Issues

## 📝 Licencia

Este proyecto está disponible bajo la licencia MIT.

## 👤 Autor

Creado por Laura Torres Jiménez

---

**Hecho con ❤️ durante un curso de 14 días aprendiendo Vue 3**
