import { BASE_URL } from './config'

export async function createBooking(data) {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/bookings/`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    },
    body: JSON.stringify(data)
  })
  if (!response.ok) {
  const errorData = await response.json()
  console.log('Errore prenotazione:', errorData)
  throw new Error('Errore nella prenotazione')
}
  return response.json()
}

export async function getBookings() {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/bookings/my-bookings/`, {
    headers: { 
      'Authorization': `Token ${token}`
    }
  })
  if (!response.ok) throw new Error('Errore nel caricamento prenotazioni')
  return response.json()
}
