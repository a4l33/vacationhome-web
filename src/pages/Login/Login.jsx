import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../api/config'

function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleLogin = () => {
    fetch(`${BASE_URL}/users/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token)
          navigate('/')
        } else {
          setError('Credenziali errate')
        }
      })
      .catch(() => setError('Errore di connessione'))
  }

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '24px' }}>
      <h1>VacationHome</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button
          onClick={handleLogin}
          style={{ padding: '12px', background: '#F58634', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          Accedi
        </button>
      </div>
    </div>
  )
}

export default Login