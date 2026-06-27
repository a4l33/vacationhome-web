import { BASE_URL } from './config'

// ------ GET ------

export async function getBookings() {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/bookings/my-bookings/?as_host=true`, {
    headers: {
      'Authorization': `Token ${token}`
    }
  })
  if (!response.ok) throw new Error('Errore nel caricamento prenotazioni')
  return response.json()
}

// ------ POST ------ 

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
  if (!response.ok) throw new Error('Errore nella prenotazione')
  return response.json()
}

// ─── PATCH ──────────────────────────────────────────────

export async function confirmBooking(id) {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/bookings/${id}/confirm/`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Token ${token}`
    }
  })
  if (!response.ok) throw new Error('Errore nella conferma')
  return response.json()
}

export async function cancelBooking(id) {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/bookings/${id}/cancel/`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Token ${token}`
    }
  })
  if (!response.ok) throw new Error('Errore nella cancellazione')
  return response.json()
}