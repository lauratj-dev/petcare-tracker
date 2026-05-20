# 🐾 PetCare Tracker

> App para gestionar el cuidado de tus mascotas, construida con Vue 3.

PetCare Tracker es una aplicación web pensada para llevar el control diario de la salud y rutinas de tus mascotas: perfiles, vacunas, citas veterinarias, medicación y todo lo que normalmente acaba perdido entre notas del móvil y papeles de la nevera.

> ⚠️ **Estado del proyecto:** En desarrollo activo. La base del proyecto está montada y se están implementando las primeras funcionalidades.

---

## ✨ Funcionalidades

### Estado actual

- ✅ Estructura base del proyecto con Vue 3 + Vite
- ✅ Enrutado con Vue Router
- ✅ Gestión de estado centralizada con Pinia
- ✅ Configuración de linting (ESLint + oxlint) y formateo (Prettier)
- ✅ Entorno de testing con Vitest

### Roadmap

- 🔜 Perfiles de mascotas (nombre, especie, raza, edad, foto, peso)
- 🔜 Registro y seguimiento de vacunas con recordatorios
- 🔜 Gestión de citas veterinarias
- 🔜 Control de medicación y tratamientos
- 🔜 Histórico de peso y métricas de salud
- 🔜 Recordatorios de rutinas diarias (alimentación, paseos, higiene)
- 🔜 Soporte multi-mascota
- 🔜 Persistencia de datos (local / backend)

---

## 🛠️ Stack tecnológico

| Categoría        | Tecnología                                                  |
| ---------------- | ----------------------------------------------------------- |
| Framework        | [Vue 3](https://vuejs.org/) (Composition API)               |
| Build tool       | [Vite](https://vite.dev/)                                   |
| Estado           | [Pinia](https://pinia.vuejs.org/)                           |
| Routing          | [Vue Router](https://router.vuejs.org/)                     |
| Estilos          | [Sass](https://sass-lang.com/)                              |
| Testing          | [Vitest](https://vitest.dev/) + [Vue Test Utils](https://test-utils.vuejs.org/) |
| Linting          | [ESLint](https://eslint.org/) + [oxlint](https://oxc.rs/docs/guide/usage/linter.html) |
| Formato          | [Prettier](https://prettier.io/)                            |

---

## 📋 Requisitos

- **Node.js** `^20.19.0` o `>=22.12.0`
- **npm** (se incluye con Node)

---

## 🚀 Puesta en marcha

Clona el repositorio e instala dependencias:

```bash
git clone https://github.com/lauratj-dev/petcare-tracker.git
cd petcare-tracker
npm install
```

### Desarrollo

Levanta el servidor de desarrollo con hot-reload:

```bash
npm run dev
```

Por defecto la app estará disponible en [http://localhost:5173](http://localhost:5173).

### Build de producción

```bash
npm run build
```

Los archivos optimizados se generan en la carpeta `dist/`.

### Previsualizar el build

```bash
npm run preview
```

---

## 🧪 Tests

Ejecuta los tests unitarios con Vitest:

```bash
npm run test:unit
```

---

## 🧹 Calidad de código

Linting (ejecuta oxlint y ESLint en cadena, con auto-fix):

```bash
npm run lint
```

Formateo con Prettier:

```bash
npm run format
```

---

## 🧰 Configuración recomendada del IDE

- [VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) — desactiva Vetur si lo tienes instalado.
- Extensiones útiles: ESLint, Prettier, EditorConfig.

Para depurar en el navegador:

- **Chromium** (Chrome, Edge, Brave…): [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- **Firefox**: [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

---

## 📁 Estructura del proyecto

```
petcare-tracker/
├── public/              # Recursos estáticos servidos tal cual
├── src/                 # Código fuente de la app
│   ├── assets/          # Estilos e imágenes
│   ├── components/      # Componentes Vue reutilizables
│   ├── router/          # Configuración de Vue Router
│   ├── stores/          # Stores de Pinia
│   ├── views/           # Vistas asociadas a rutas
│   ├── App.vue          # Componente raíz
│   └── main.js          # Punto de entrada
├── index.html           # HTML base servido por Vite
├── vite.config.js       # Configuración de Vite
└── vitest.config.js     # Configuración de Vitest
```

---

## 🤝 Contribuir

Este proyecto está en fase inicial, pero cualquier sugerencia es bienvenida. Si quieres aportar:

1. Haz un fork del repositorio
2. Crea una rama (`git checkout -b feature/mi-feature`)
3. Haz commit de tus cambios (`git commit -m 'Add: mi feature'`)
4. Sube la rama (`git push origin feature/mi-feature`)
5. Abre un Pull Request

---

## 📄 Licencia

Pendiente de definir.

---

## 👤 Autora

**Laura Torres Jiménez** — [@lauratj-dev](https://github.com/lauratj-dev)
