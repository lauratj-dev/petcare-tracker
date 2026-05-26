import User from '../models/User.js'
import jwt from 'jsonwebtoken'

// Registrar usuario
export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body

    // Validar campos
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' })
    }

    // Verificar si el usuario ya existe
    const usuarioExistente = await User.findOne({ email })
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El email ya está registrado' })
    }

    // Crear nuevo usuario
    const nuevoUsuario = new User({ email, password, name })
    await nuevoUsuario.save()

    // Generar token JWT
    const token = jwt.sign(
      { userId: nuevoUsuario._id, email: nuevoUsuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(201).json({
      message: 'Usuario registrado correctamente',
      token,
      user: { id: nuevoUsuario._id, email: nuevoUsuario.email, name: nuevoUsuario.name }
    })
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message })
  }
}

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validar campos
    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña obligatorios' })
    }

    // Buscar usuario
    const usuario = await User.findOne({ email })
    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales inválidas' })
    }

    // Comparar contraseña
    const esValida = await usuario.comparePassword(password)
    if (!esValida) {
      return res.status(401).json({ message: 'Credenciales inválidas' })
    }

    // Generar token JWT
    const token = jwt.sign(
      { userId: usuario._id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      message: 'Login exitoso',
      token,
      user: { id: usuario._id, email: usuario.email, name: usuario.name }
    })
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message })
  }
}