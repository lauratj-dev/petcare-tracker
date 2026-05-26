import Pet from '../models/Pet.js'

// Obtener todas las mascotas del usuario
export const getPets = async (req, res) => {
  try {
    const pets = await Pet.find({ userId: req.userId })
    res.json(pets)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener mascotas', error: error.message })
  }
}

// Crear mascota
export const createPet = async (req, res) => {
  try {
    const { name, species, age, photo } = req.body

    if (!name || !species || age === undefined) {
      return res.status(400).json({ message: 'Campos obligatorios faltantes' })
    }

    const nuevaMascota = new Pet({
      userId: req.userId,
      name,
      species,
      age,
      photo: photo || null
    })

    await nuevaMascota.save()
    res.status(201).json(nuevaMascota)
  } catch (error) {
    res.status(500).json({ message: 'Error al crear mascota', error: error.message })
  }
}

// Actualizar mascota
export const updatePet = async (req, res) => {
  try {
    const { id } = req.params
    const { name, species, age, photo } = req.body

    const mascota = await Pet.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { name, species, age, photo },
      { new: true }
    )

    if (!mascota) {
      return res.status(404).json({ message: 'Mascota no encontrada' })
    }

    res.json(mascota)
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar mascota', error: error.message })
  }
}

// Eliminar mascota
export const deletePet = async (req, res) => {
  try {
    const { id } = req.params

    const mascota = await Pet.findOneAndDelete({ _id: id, userId: req.userId })

    if (!mascota) {
      return res.status(404).json({ message: 'Mascota no encontrada' })
    }

    res.json({ message: 'Mascota eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar mascota', error: error.message })
  }
}

// Añadir visita
export const addVisit = async (req, res) => {
  try {
    const { id } = req.params
    const { date, reason } = req.body

    const mascota = await Pet.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { $push: { visits: { date, reason } } },
      { new: true }
    )

    if (!mascota) {
      return res.status(404).json({ message: 'Mascota no encontrada' })
    }

    res.json(mascota)
  } catch (error) {
    res.status(500).json({ message: 'Error al añadir visita', error: error.message })
  }
}

// Añadir vacuna
export const addVaccine = async (req, res) => {
  try {
    const { id } = req.params
    const { name, date, nextDate } = req.body

    const mascota = await Pet.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { $push: { vaccines: { name, date, nextDate } } },
      { new: true }
    )

    if (!mascota) {
      return res.status(404).json({ message: 'Mascota no encontrada' })
    }

    res.json(mascota)
  } catch (error) {
    res.status(500).json({ message: 'Error al añadir vacuna', error: error.message })
  }
}

// Añadir peso
export const addWeight = async (req, res) => {
  try {
    const { id } = req.params
    const { date, kg } = req.body

    const mascota = await Pet.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { $push: { weights: { date, kg } } },
      { new: true }
    )

    if (!mascota) {
      return res.status(404).json({ message: 'Mascota no encontrada' })
    }

    res.json(mascota)
  } catch (error) {
    res.status(500).json({ message: 'Error al añadir peso', error: error.message })
  }
}