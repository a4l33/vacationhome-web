import { BASE_URL } from './config'

// GET utente corrente ────────────────────────────────

export async function getCurrentUser() {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/users/me/`, {
    headers: { 'Authorization': `Token ${token}` }
  })
  if (!response.ok) throw new Error('Errore nel recupero utente')
  return response.json()
}

// POST registrazione ─────────────────────────────────

export async function registerUser(data) {
  const response = await fetch(`${BASE_URL}/users/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(Object.values(errorData)[0])
  }
  return response.json()
}

// POST verifica OTP ──────────────────────────────────

export async function verifyOtp(code) {
  const response = await fetch(`${BASE_URL}/users/verify-otp/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code })
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(Object.values(errorData)[0])
  }
  return response.json()
}

//  POST recupero password ─────────────────────────────

export async function forgotPassword(email) {
  const response = await fetch(`${BASE_URL}/users/forgot-password/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  })
  if (!response.ok) throw new Error('Errore nella richiesta')
  return response.json()
}

export async function resetPassword(code, newPassword) {
  const response = await fetch(`${BASE_URL}/users/reset-password/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, new_password: newPassword })
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(Object.values(errorData)[0])
  }
  return response.json()
}