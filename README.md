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

## 🎯 Roadmap futuro

- [ ] Backend con Node.js + Express
- [ ] Base de datos real (MongoDB o PostgreSQL)
- [ ] Autenticación de usuarios
- [ ] Gráficas de evolución de peso
- [ ] Recordatorios de vacunas
- [ ] Exportar datos a PDF

## 📝 Licencia

Este proyecto está disponible bajo la licencia MIT.

## 👤 Autor

Creado por Laura Torres Jiménez

---

**Hecho con ❤️ durante un curso de 14 días aprendiendo Vue 3**