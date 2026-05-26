import express from 'express'
import { verifyToken } from '../middleware/authMiddleware.js'
import {
  getPets,
  createPet,
  updatePet,
  deletePet,
  addVisit,
  addVaccine,
  addWeight
} from '../controllers/petController.js'

const router = express.Router()

// Todas las rutas de mascotas requieren autenticación
router.use(verifyToken)

router.get('/', getPets)
router.post('/', createPet)
router.put('/:id', updatePet)
router.delete('/:id', deletePet)

router.post('/:id/visits', addVisit)
router.post('/:id/vaccines', addVaccine)
router.post('/:id/weights', addWeight)

export default router