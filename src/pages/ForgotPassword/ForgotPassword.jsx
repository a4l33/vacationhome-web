import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { forgotPassword, resetPassword } from '../../api/users'
import logo from '../../assets/logo.svg'
import '../Login/Login.css'

function ForgotPassword() {
  const navigate = useNavigate()

  // ─── State ───────────────────────────────────────────────
  const [step, setStep] = useState(1) // 1 = chiedi email, 2 = inserisci codice + nuova password
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  // ─── Handlers ───────────────────────────────────────────
  const handleRequestCode = () => {
    forgotPassword(email)
      .then(data => {
        setMessage(data.message)
        setStep(2)
      })
      .catch(err => setError(err.message))
  }

  const handleResetPassword = () => {
    resetPassword(code, newPassword)
      .then(() => {
        navigate('/login')
      })
      .catch(err => setError(err.message))
  }

  // ─── Render ──────────────────────────────────────────────
  return (
    <div className="login-page">
      <div className="login-card">
        <span className="login-back" onClick={() => navigate('/login')}>← Indietro</span>
        <img src={logo} alt="ParaDay" className="login-logo" />
        <h1 className="login-title">Recupera password</h1>

        {step === 1 ? (
          <>
            <p className="login-subtitle">Inserisci la tua email per ricevere il codice</p>
            <div className="login-form">
              <input
                className="login-input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              {error && <p className="login-error">{error}</p>}
              <button className="login-btn" onClick={handleRequestCode}>
                Invia codice
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="login-subtitle">{message}</p>
            <div className="login-form">
              <input
                className="login-input"
                type="text"
                placeholder="Codice OTP"
                value={code}
                onChange={e => setCode(e.target.value)}
              />
              <input
                className="login-input"
                type="password"
                placeholder="Nuova password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
              />
              {error && <p className="login-error">{error}</p>}
              <button className="login-btn" onClick={handleResetPassword}>
                Reimposta password
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ForgotPassword