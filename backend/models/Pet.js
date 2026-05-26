import mongoose from 'mongoose'

const petSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  species: {
    type: String,
    enum: ['Perro', 'Gato', 'Conejo', 'Otro'],
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  photo: {
    type: String,
    default: null
  },
  visits: [{
    date: String,
    reason: String
  }],
  vaccines: [{
    name: String,
    date: String,
    nextDate: String
  }],
  weights: [{
    date: String,
    kg: Number
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Pet', petSchema)