import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePetsStore } from './pets'

describe('Pets Store', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('empieza con 0 mascotas', () => {
    const store = usePetsStore()
    expect(store.pets.length).toBe(0)
  })

  it('añade una mascota correctamente', () => {
    const store = usePetsStore()
    const newPet = { id: 1, name: 'Luna', species: 'Gato', age: 3 }
    store.addPet(newPet)
    
    expect(store.pets.length).toBe(1)
    expect(store.pets[0].name).toBe('Luna')
  })

  it('borra una mascota correctamente', () => {
    const store = usePetsStore()
    store.addPet({ id: 1, name: 'Luna', species: 'Gato', age: 3 })
    store.addPet({ id: 2, name: 'Misu', species: 'Perro', age: 5 })
    
    expect(store.pets.length).toBe(2)
    store.removePet(1)
    expect(store.pets.length).toBe(1)
    expect(store.pets[0].name).toBe('Misu')
  })

  it('añade una visita a una mascota', () => {
    const store = usePetsStore()
    store.addPet({ id: 1, name: 'Luna', species: 'Gato', age: 3 })
    
    const visit = { date: '2025-05-21', reason: 'Revisión anual' }
    store.addVisit(1, visit)
    
    expect(store.pets[0].visits.length).toBe(1)
    expect(store.pets[0].visits[0].reason).toBe('Revisión anual')
  })
})