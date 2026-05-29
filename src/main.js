import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './styles/base.css'
import * as Sentry from '@sentry/vue'

const app = createApp(App)

Sentry.init({
  app,
  dsn: 'https://875d0cea2cf9ee8d5853ce13133c5726@o4511471993421824.ingest.de.sentry.io/4511471997026384',
  integrations: [Sentry.browserTracingIntegration({ router }), Sentry.replayIntegration()],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  sendDefaultPii: true,
})

app.use(createPinia())
app.use(router)

app.mount('#app')
