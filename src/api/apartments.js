import { BASE_URL } from './config'

// ------- GET --------

export async function getApartments(page = 1, city = '', name = '', asHost = false) {
  const token = localStorage.getItem('token')
  let url = `${BASE_URL}/properties/?page=${page}`
  if (city) url += `&city=${city}`
  if (name) url += `&name=${name}`
  if (asHost) url += `&as_host=true`

  const headers = {}
  if (token) headers['Authorization'] = `Token ${token}`

  const response = await fetch(url, { headers })
  if (!response.ok) throw new Error('Errore nel caricamento degli appartamenti')
  return response.json()
}

export async function getApartmentById(id) { // ←  async "questa funzione ha un'attesa dentro"
  const response = await fetch(`${BASE_URL}/properties/${id}/`) // await ← "aspetta qui finché fetch non risponde"
  if (!response.ok) throw new Error('Appartamento non trovato')
    return response.json()
}

// ------- POST --------

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
  if (!response.ok) throw new Error('Errore nella creazione')
    return response.json()
}

export async function createRoom(propertyId, data) {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/properties/${propertyId}/rooms/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    },
    body: JSON.stringify(data)
  })
  if (!response.ok) throw new Error('Errore nella creazione della stanza')
  return response.json()
}

export async function uploadRoomImage(propertyId, roomId, imageFile) {
  const token = localStorage.getItem('token')
  const formData = new FormData()
  formData.append('image', imageFile)
  const response = await fetch(`${BASE_URL}/properties/${propertyId}/rooms/${roomId}/images/`, {
    method: 'POST',
    headers: {
      'Authorization': `Token ${token}`
    },
    body: formData
  })
  if (!response.ok) throw new Error('Errore nel caricamento immagine')
  return response.json()
}

// ------ PATCH ------

export async function updateApartment(id, data) {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/properties/${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    },
    body: JSON.stringify(data)
  })
  if (!response.ok) throw new Error('Errore nella modifica')
  return response.json()
}


// ------- DELETE --------

export async function deleteApartment(id) {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/properties/${id}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${token}`
    }
  })
  if (!response.ok) throw new Error('Errore nella eliminazione')
}