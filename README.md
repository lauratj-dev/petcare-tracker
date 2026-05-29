# 🐾 PetCare Tracker

Una aplicación web full-stack para gestionar y dar seguimiento a tus mascotas: registrar datos básicos, visitas al veterinario, vacunas y evolución de peso.

## 🚀 Demo en vivo
[Ver la app aquí](https://petcare-tracker.vercel.app)

---

## ✨ Características

- ✅ Registra tus mascotas (nombre, especie, edad, foto)
- ✅ Guarda historial de visitas al veterinario
- ✅ Registra vacunas y próximas dosis
- ✅ Sigue el peso de tus mascotas con gráfica de evolución
- ✅ Busca mascotas por nombre
- ✅ Filtra por especie
- ✅ Autenticación real con Firebase Auth
- ✅ Datos en la nube con Firestore (cada usuario ve solo sus mascotas)
- ✅ PWA instalable en móvil
- ✅ Monitoring de errores con Sentry

---

## 🛠️ Tecnologías

| Área | Tecnología |
|------|------------|
| Frontend | Vue 3 + Composition API |
| Estado | Pinia |
| Enrutamiento | Vue Router |
| Estilos | Sass |
| Gráficas | Chart.js |
| Auth | Firebase Authentication |
| Base de datos | Firestore |
| Testing | Vitest + Vue Test Utils |
| Tipos | TypeScript |
| Build | Vite |
| Deploy | Vercel |
| CI/CD | GitHub Actions |
| Contenedor | Docker + Nginx |
| Monitoring | Sentry |
| PWA | vite-plugin-pwa |
| Pre-commit | Husky + lint-staged |

---

## 📦 Instalación local

1. Clona el repositorio:
```bash
git clone https://github.com/lauratj-dev/petcare-tracker.git
cd petcare-tracker
```

2. Instala dependencias:
```bash
npm install
```

3. Arranca el servidor de desarrollo:
```bash
npm run dev
```

4. Abre en tu navegador: `http://localhost:5173/`

---

## 🧪 Tests

```bash
npm run test:unit
```

---

## 🐳 Docker

```bash
docker-compose up --build
```

Luego abre: `http://localhost:8080`

---

## 📁 Estructura del proyecto

src/
├── components/         # Componentes Vue reutilizables
│   ├── PetCard.vue
│   ├── PetForm.vue
│   ├── VaccineForm.vue
│   ├── VisitForm.vue
│   └── WeightForm.vue
├── views/              # Páginas principales
│   ├── HomeView.vue
│   └── PetDetailView.vue
├── stores/             # Estado global (Pinia)
│   ├── auth.ts
│   ├── pets-firestore.ts
│   └── counter.ts
├── router/
│   └── index.js
├── firebase.js
└── assets/
└── styles/

---

## 🎯 Roadmap

### 🎨 Fase 1: Diseño y UX ✅ Completada
- ✅ Tema visual mejorado con paleta morada/lila
- ✅ Logo y favicon personalizado
- ✅ Responsive 100%

### ⚡ Fase 2: Funcionalidades ✅ Completada
- ✅ CRUD completo con modales de confirmación
- ✅ Upload de foto por mascota
- ✅ Gráfica de evolución de peso (Chart.js)
- ✅ Registro de vacunas y visitas al veterinario

### 🔐 Fase 3: Backend y Autenticación ✅ Completada
- ✅ Autenticación real con Firebase Auth
- ✅ Base de datos en la nube con Firestore
- ✅ Cada usuario ve solo sus mascotas
- ✅ Deploy en Vercel

### 🧪 Fase 4: Calidad profesional ✅ Completada
- ✅ Tests unitarios con Vitest (11 tests)
- ✅ Migración a TypeScript
- ✅ Pre-commit hooks con Husky + lint-staged

### 🚀 Fase 5: DevOps y producción ✅ Completada
- ✅ Docker Compose con Nginx
- ✅ Monitoring con Sentry (errores + session replay)
- ✅ PWA instalable en móvil
- ✅ CI/CD con GitHub Actions

---

## 📊 Estado actual

| Aspecto | Estado |
|--------|--------|
| Frontend | ✅ Funcional y desplegado |
| Autenticación | ✅ Firebase Auth |
| Base de datos | ✅ Firestore |
| Tests | ✅ 11 tests unitarios |
| TypeScript | ✅ Migración parcial |
| CI/CD | ✅ GitHub Actions |
| Docker | ✅ Docker Compose + Nginx |
| Monitoring | ✅ Sentry |
| PWA | ✅ Instalable en móvil |
| Documentación | ✅ README profesional |

---

## 💡 Cómo contribuir

¿Quieres seguir el desarrollo? Las próximas mejoras se anunciarán en GitHub Issues.

- ⭐ Star el repo si te gusta
- 👀 Watch para seguir actualizaciones
- 💬 Comentar sugerencias en Issues

---

## 📝 Licencia

Este proyecto está disponible bajo la licencia MIT.

---

## 👤 Autora

Creado por **Laura Torres Jiménez**

Hecho con ❤️ aprendiendo Vue 3, Firebase y DevOps desde cero
