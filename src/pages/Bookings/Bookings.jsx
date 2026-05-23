import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getBookings } from '../../api/bookings'

function Bookings() {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getBookings()
      .then(data => setBookings(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 24px' }}>
      <button
        onClick={() => navigate('/')}
        style={{ background: 'none', border: '1px solid #ddd', borderRadius: '100px', padding: '8px 16px', cursor: 'pointer', marginBottom: '24px' }}
      >
        ← Torna alla lista
      </button>

      <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>Prenotazioni</h1>
      <p style={{ color: '#888', marginBottom: '32px' }}>Tutte le prenotazioni ricevute</p>

      {loading && <p>Caricamento...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {bookings.map(booking => (
        <div
          key={booking.id}
          style={{
            border: '1px solid #eee',
            borderRadius: '16px',
            padding: '20px 24px',
            marginBottom: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontWeight: '600', marginBottom: '4px' }}>{booking.room_name || booking.room}</p>
              <p style={{ color: '#888', fontSize: '14px' }}>
                {booking.check_in} → {booking.check_out}
              </p>
              <p style={{ color: '#888', fontSize: '14px' }}>
                {booking.num_guests} ospiti
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontWeight: '700', fontSize: '18px' }}>€{booking.total_price}</p>
              <p style={{ 
                fontSize: '12px', 
                padding: '4px 10px', 
                borderRadius: '100px',
                background: booking.status === 'confirmed' ? '#e6f4ea' : '#fff3e0',
                color: booking.status === 'confirmed' ? '#2e7d32' : '#e65100'
              }}>
                {booking.status}
              </p>
            </div>
          </div>
        </div>
      ))}

      {!loading && bookings.length === 0 && (
        <p style={{ textAlign: 'center', color: '#888', padding: '48px' }}>
          Nessuna prenotazione ancora
        </p>
      )}
    </div>
  )
}

export default Bookings