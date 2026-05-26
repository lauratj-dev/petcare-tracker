import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import { register, login } from './controllers/authController.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json({ limit: '50mb' }))

connectDB()

// Rutas de autenticación DIRECTAS
app.post('/api/auth/register', register)
app.post('/api/auth/login', login)

app.get('/', (req, res) => {
  res.json({ message: '🐾 API funcionando' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`🚀 Servidor en puerto ${PORT}`))