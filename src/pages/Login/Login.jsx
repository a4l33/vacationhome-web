import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../api/config'
import logo from '../../assets/logo.svg'
import './Login.css'

function Login() {
  const navigate = useNavigate()

  // ─── State ───────────────────────────────────────────────
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  // ─── Handlers ───────────────────────────────────────────
  const handleLogin = () => {
    fetch(`${BASE_URL}/users/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json()) // leggi il testo della risposta e trasformalo in un oggetto JavaScript
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token) // salva il token nel localStorage
          navigate('/')
        } else {
          setError('Credenziali errate')
        }
      })
      .catch(() => setError('Errore di connessione'))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLogin()
  }

  // ─── Render ──────────────────────────────────────────────
  return (
    <div className="login-page">
      <div className="login-card">
        <img src={logo} alt="ParaDay" className="login-logo" />
        <h1 className="login-title">QuietHome</h1>
        <p className="login-subtitle">Accedi alla tua dashboard</p>

        <div className="login-form">
          <input
            className="login-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <a href="/forgot-password" className="login-forgot">Password dimenticata</a>

          {error && <p className="login-error">{error}</p>}

          <button className="login-btn" onClick={handleLogin}>
            Accedi
          </button>

          <p className="login-register">
            Non hai un account? <a href="/register">Registrati</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login