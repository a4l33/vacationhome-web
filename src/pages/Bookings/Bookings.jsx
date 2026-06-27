import { useState, useEffect } from 'react'
import { getBookings, confirmBooking, cancelBooking } from '../../api/bookings'
import { BASE_URL } from '../../api/config'
import Navbar from '../../components/Navbar/Navbar'
import SearchBar from '../../components/SearchBar/SearchBar'
import iconUsers from '../../assets/icons/users.svg'
import iconCalendar from '../../assets/icons/calendar.svg'
import iconUser from '../../assets/icons/user.svg'
import './Bookings.css'

function Bookings() {

  // ─── State ───────────────────────────────────────────────
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  // ─── Fetch dati ──────────────────────────────────────────
  useEffect(() => {
    getBookings()
      .then(data => setBookings(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  // ─── Handlers ───────────────────────────────────────────
  const handleConfirm = (id) => {
    confirmBooking(id)
      .then(data => setBookings(prev => prev.map(b => b.id === id ? data : b)))
      .catch(err => alert(`Errore: ${err.message}`))
  }

  const handleCancel = (id) => {
    cancelBooking(id)
      .then(data => setBookings(prev => prev.map(b => b.id === id ? data : b)))
      .catch(err => alert(`Errore: ${err.message}`))
  }

  const statusLabel = {
    pending: 'In attesa',
    confirmed: 'Confermata',
    cancelled: 'Rifiutata'
  }

  // ─── Render ──────────────────────────────────────────────
  return (
    <>
      <Navbar />
      <div className="bookings-page">

        <SearchBar
          value={searchQuery}
          placeholder="Cerca prenotazioni..."
          onChange={e => setSearchQuery(e.target.value)}
        />

        <h1 className="bookings-title">Prenotazioni</h1>
        <p className="bookings-subtitle">Tutte le prenotazioni ricevute</p>

        {loading && <p className="bookings-message">Caricamento...</p>}
        {error && <p className="bookings-message">{error}</p>}

        {bookings.map(booking => (
          <div key={booking.id} className="booking-card">

            <div className="booking-image">
              {booking.room_details?.images?.[0]?.image ? (
                <img src={`${BASE_URL}${booking.room_details.images[0].image}`} alt="" />
              ) : (
                <div className="booking-image-placeholder" />
              )}
            </div>

            <div className="booking-card-body">
              <p className="booking-room">{booking.room_details?.name}</p>
              <p className="booking-meta">
                <img src={iconUser} alt="" />
                {booking.guest_details?.username}
              </p>
              <p className="booking-meta">
                <img src={iconCalendar} alt="" />
                {booking.check_in} → {booking.check_out}
              </p>
              <p className="booking-meta">
                <img src={iconUsers} alt="" />
                {booking.num_guests} ospiti
              </p>
            </div>

            <div className="booking-card-right">
              <span className={`booking-status ${booking.status}`}>
                {statusLabel[booking.status] || booking.status}
              </span>
              <p className="booking-price">€{booking.total_price}</p>
              {booking.status === 'pending' && (
                <div className="booking-actions">
                  <button className="booking-confirm-btn" onClick={() => handleConfirm(booking.id)}>Conferma</button>
                  <button className="booking-cancel-btn" onClick={() => handleCancel(booking.id)}>Rifiuta</button>
                </div>
              )}
            </div>

          </div>
        ))}

        {!loading && bookings.length === 0 && (
          <p className="bookings-message">Nessuna prenotazione ancora</p>
        )}

      </div>
    </>
  )
}

export default Bookings