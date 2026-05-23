// fetch a /properties/

import { BASE_URL } from './config'

export async function getApartments(page = 1) {
  const response = await fetch(`${BASE_URL}/properties/?page=${page}`)
  if (!response.ok) throw new Error('Errore nel caricamento degli appartamenti')
  return response.json()
}

export async function getApartmentById(id) {
  const response = await fetch(`${BASE_URL}/properties/${id}/`)
  if (!response.ok) throw new Error('Appartamento non trovato')
  return response.json()
}

export async function createApartment(data) {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/properties/`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    },
    body: JSON.stringify(data)
  })
  if (!response.ok) {
    const errorData = await response.json()
    console.log('Errore Django:', errorData)
    throw new Error('Errore nella creazione')
  }
  return response.json()
}