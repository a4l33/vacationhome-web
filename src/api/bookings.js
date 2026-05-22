// fetch a /bookings/

import { BASE_URL } from './config'

export async function createBooking(data) {
  const response = await fetch(`${BASE_URL}/bookings/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!response.ok) throw new Error('Errore nella prenotazione')
  return response.json()
}