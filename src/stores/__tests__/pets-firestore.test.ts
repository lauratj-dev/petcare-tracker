import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { usePetsFirestoreStore } from '../pets-firestore'

const authMock = vi.hoisted(() => ({
  user: null as { uid: string } | null,
}))

const firestoreMocks = vi.hoisted(() => ({
  collection: vi.fn(),
  addDoc: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  getDocs: vi.fn(),
  deleteDoc: vi.fn(),
  doc: vi.fn(),
  updateDoc: vi.fn(),
  arrayUnion: vi.fn(),
}))

vi.mock('../../firebase.js', () => ({
  db: {},
}))

vi.mock('../auth', () => ({
  useAuthStore: () => authMock,
}))

vi.mock('firebase/firestore', () => ({
  collection: firestoreMocks.collection,
  addDoc: firestoreMocks.addDoc,
  query: firestoreMocks.query,
  where: firestoreMocks.where,
  getDocs: firestoreMocks.getDocs,
  deleteDoc: firestoreMocks.deleteDoc,
  doc: firestoreMocks.doc,
  updateDoc: firestoreMocks.updateDoc,
  arrayUnion: firestoreMocks.arrayUnion,
}))

const petData = {
  name: 'Luna',
  species: 'Perro',
  age: 3,
  photo: 'luna.jpg',
}

describe('usePetsFirestoreStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())

    authMock.user = null

    vi.clearAllMocks()

    firestoreMocks.collection.mockImplementation((_database: unknown, collectionName: string) => ({
      collectionName,
    }))

    firestoreMocks.where.mockImplementation((field: string, operator: string, value: string) => ({
      field,
      operator,
      value,
    }))

    firestoreMocks.query.mockImplementation((collectionReference: unknown, condition: unknown) => ({
      collectionReference,
      condition,
    }))

    firestoreMocks.doc.mockImplementation(
      (_database: unknown, collectionName: string, id: string) => ({
        collectionName,
        id,
      }),
    )

    firestoreMocks.arrayUnion.mockImplementation((value: unknown) => ({
      operation: 'arrayUnion',
      value,
    }))
  })

  it('no añade una mascota si el usuario no está autenticado', async () => {
    const store = usePetsFirestoreStore()

    const result = await store.addPet(petData)

    expect(result).toBe(false)
    expect(firestoreMocks.addDoc).not.toHaveBeenCalled()
    expect(store.pets).toHaveLength(0)
  })

  it('añade una mascota para el usuario autenticado', async () => {
    authMock.user = { uid: 'user-1' }
    firestoreMocks.addDoc.mockResolvedValue({ id: 'pet-1' })

    const store = usePetsFirestoreStore()
    const result = await store.addPet(petData)

    expect(result).toBe(true)

    expect(firestoreMocks.addDoc).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        ...petData,
        userId: 'user-1',
        createdAt: expect.any(Date),
      }),
    )

    expect(store.pets).toEqual([
      {
        id: 'pet-1',
        ...petData,
      },
    ])

    expect(store.loading).toBe(false)
  })

  it('carga únicamente las mascotas del usuario autenticado', async () => {
    authMock.user = { uid: 'user-1' }

    firestoreMocks.getDocs.mockResolvedValue({
      docs: [
        {
          id: 'pet-1',
          data: () => ({
            ...petData,
            userId: 'user-1',
          }),
        },
      ],
    })

    const store = usePetsFirestoreStore()

    await store.loadPets()

    expect(firestoreMocks.where).toHaveBeenCalledWith('userId', '==', 'user-1')

    expect(store.pets).toEqual([
      {
        id: 'pet-1',
        ...petData,
        userId: 'user-1',
      },
    ])

    expect(store.loading).toBe(false)
  })

  it('no carga mascotas si no existe un usuario autenticado', async () => {
    const store = usePetsFirestoreStore()

    await store.loadPets()

    expect(firestoreMocks.getDocs).not.toHaveBeenCalled()
    expect(store.pets).toHaveLength(0)
  })

  it('elimina una mascota de Firestore y del estado local', async () => {
    firestoreMocks.deleteDoc.mockResolvedValue(undefined)

    const store = usePetsFirestoreStore()

    store.pets.push({
      id: 'pet-1',
      ...petData,
    })

    const result = await store.deletePet('pet-1')

    expect(result).toBe(true)
    expect(firestoreMocks.deleteDoc).toHaveBeenCalledWith({
      collectionName: 'pets',
      id: 'pet-1',
    })
    expect(store.pets).toHaveLength(0)
  })

  it('actualiza una mascota en Firestore y en el estado local', async () => {
    firestoreMocks.updateDoc.mockResolvedValue(undefined)

    const store = usePetsFirestoreStore()

    store.pets.push({
      id: 'pet-1',
      ...petData,
    })

    const result = await store.updatePet('pet-1', {
      age: 4,
    })

    expect(result).toBe(true)

    expect(firestoreMocks.updateDoc).toHaveBeenCalledWith(
      {
        collectionName: 'pets',
        id: 'pet-1',
      },
      {
        age: 4,
      },
    )

    expect(store.pets[0]?.age).toBe(4)
  })

  it('añade una vacuna a una mascota', async () => {
    firestoreMocks.updateDoc.mockResolvedValue(undefined)

    const store = usePetsFirestoreStore()

    store.pets.push({
      id: 'pet-1',
      ...petData,
      vaccines: [],
    })

    const vaccine = {
      name: 'Rabia',
      date: '2026-08-06',
    }

    const result = await store.addVaccine('pet-1', vaccine)

    expect(result).toBe(true)
    expect(store.pets[0]?.vaccines).toEqual([vaccine])
  })

  it('añade una visita veterinaria a una mascota', async () => {
    firestoreMocks.updateDoc.mockResolvedValue(undefined)

    const store = usePetsFirestoreStore()

    store.pets.push({
      id: 'pet-1',
      ...petData,
      visits: [],
    })

    const visit = {
      date: '2026-08-06',
      reason: 'Revisión anual',
      vet: 'Clínica PetCare',
    }

    const result = await store.addVisit('pet-1', visit)

    expect(result).toBe(true)
    expect(store.pets[0]?.visits).toEqual([visit])
  })

  it('añade un registro de peso a una mascota', async () => {
    firestoreMocks.updateDoc.mockResolvedValue(undefined)

    const store = usePetsFirestoreStore()

    store.pets.push({
      id: 'pet-1',
      ...petData,
      weights: [],
    })

    const weight = {
      weightValue: 12.5,
      weightDate: '2026-08-06',
    }

    const result = await store.addWeight('pet-1', weight)

    expect(result).toBe(true)
    expect(store.pets[0]?.weights).toEqual([weight])
  })

  it('devuelve false y restablece loading si Firestore falla', async () => {
    authMock.user = { uid: 'user-1' }

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    firestoreMocks.addDoc.mockRejectedValue(new Error('Error simulado de Firestore'))

    const store = usePetsFirestoreStore()
    const result = await store.addPet(petData)

    expect(result).toBe(false)
    expect(store.loading).toBe(false)
    expect(consoleErrorSpy).toHaveBeenCalled()

    consoleErrorSpy.mockRestore()
  })
})
