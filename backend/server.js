import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

dotenv.config()

const app = express()

// Middlewares
app.use(cors())
app.use(express.json({ limit: '50mb' }))  // 50mb para las fotos en base64

// Conectar a MongoDB
connectDB()

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: '🐾 PetCare API funcionando correctamente' })
})

// Puerto
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
})