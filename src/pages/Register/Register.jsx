import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../../api/users'
import logo from '../../assets/logo.svg'
import '../Login/Login.css'

function Register() {
  const navigate = useNavigate()

  //  State 
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState(null)

  //  Handlers 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRegister = () => {
    registerUser({ ...formData, is_host: true })
      .then(data => {
        navigate('/verify-otp', { state: { userId: data.id } })
      })
      .catch(err => setError(err.message))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleRegister()
  }

  //  Render 
  return (
    <div className="login-page">
      <div className="login-card">
        <span className="login-back" onClick={() => navigate('/login')}>← Indietro</span>
        <img src={logo} alt="ParaDay" className="login-logo" />
        <h1 className="login-title">Crea account</h1>
        <p className="login-subtitle">Registrati come host su ParaDay</p>

        <div className="login-form">
          <input
            className="login-input"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            name="username"
            onKeyDown={handleKeyDown}
          />
          <input
            className="login-input"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            name="email"
            onKeyDown={handleKeyDown}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            name="password"
            onKeyDown={handleKeyDown}
          />

          {error && <p className="login-error">{error}</p>}

          <button className="login-btn" onClick={handleRegister}>
            Registrati
          </button>

          <p className="login-register">
            Hai già un account? <a href="/login">Accedi</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register