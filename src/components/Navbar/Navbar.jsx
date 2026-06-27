import { useNavigate, useLocation } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import './Navbar.css'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  //  Handlers 
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  // Active state 
  const isApartmentsActive =
    location.pathname === '/' ||
    location.pathname.startsWith('/apartment') ||
    location.pathname.startsWith('/add')

  const isBookingsActive = location.pathname === '/bookings'

  // Render 
  return (
    <nav className="navbar">
      <img src={logo} alt="VacationHome" className="navbar-logo" onClick={() => navigate('/')} />

      <div className="navbar-links">
        <button className={`navbar-link ${isApartmentsActive ? 'active' : ''}`} onClick={() => navigate('/')}>
          Appartamenti
        </button>
        <button className={`navbar-link ${isBookingsActive ? 'active' : ''}`} onClick={() => navigate('/bookings')}>
          Prenotazioni
        </button>
      </div>

      <button className="navbar-logout" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  )
}

export default Navbar