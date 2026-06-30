import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { verifyOtp } from '../../api/users'
import logo from '../../assets/logo.svg'
import '../Login/Login.css'

function VerifyOtp() {
  const navigate = useNavigate()

  // ─── State ───────────────────────────────────────────────
  const [code, setCode] = useState('')
  const [error, setError] = useState(null)

  // ─── Handlers ───────────────────────────────────────────
  const handleVerify = () => {
    verifyOtp(code)
      .then(data => {
        localStorage.setItem('token', data.token)
        navigate('/')
      })
      .catch(err => setError(err.message))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleVerify()
  }

  // ─── Render ──────────────────────────────────────────────
  return (
    <div className="login-page">
      <div className="login-card">
        <span className="login-back" onClick={() => navigate('/login')}>← Indietro</span>
        <img src={logo} alt="ParaDay" className="login-logo" />
        <h1 className="login-title">Verifica email</h1>
        <p className="login-subtitle">Ti abbiamo inviato un codice via email</p>

        <div className="login-form">
          <input
            className="login-input"
            type="text"
            placeholder="Codice OTP"
            value={code}
            onChange={e => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          {error && <p className="login-error">{error}</p>}

          <button className="login-btn" onClick={handleVerify}>
            Verifica
          </button>
        </div>
      </div>
    </div>
  )
}

export default VerifyOtp