import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getApartmentById } from '../../api/apartments'
import { createBooking } from '../../api/bookings'
import './Detail.css'

function Detail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [apartment, setApartment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [selectedRoom, setSelectedRoom] = useState(null)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [numGuests, setNumGuests] = useState(1)
  const [mainImage, setMainImage] = useState(null)

  useEffect(() => {
    getApartmentById(id)
      .then(data => {
        setApartment(data)
        setSelectedRoom(data.rooms[0])
        setMainImage(data.rooms[0]?.images[0]?.image || null)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  const numNights = checkIn && checkOut
    ? Math.max(0, Math.round((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)))
    : 0

  const totalPrice = selectedRoom ? numNights * selectedRoom.price_per_night : 0

  const handleBooking = () => {
    createBooking({
      room: selectedRoom.id,
      check_in: checkIn,
      check_out: checkOut,
      num_guests: numGuests
    })
      .then(() => alert(`Prenotazione confermata! Totale: €${totalPrice}`))
      .catch(err => alert(`Errore: ${err.message}`))
  }

  if (loading) return <p className="archive-message">Caricamento...</p>
  if (error) return <p className="archive-message error">{error}</p>
  if (!apartment) return null

  return (
    <div className="detail-page">

      <div className="detail-navbar">
        <button className="detail-back-btn" onClick={() => navigate('/')}>
          ← Torna alla lista
        </button>
      </div>

      <div className="detail-content">

        <h1 className="detail-title">{apartment.name}</h1>
        <div className="detail-meta">
          <span>{apartment.city}, {apartment.country}</span>
          <span>·</span>
          <span>{apartment.address}</span>
        </div>

        <div className="detail-gallery">
          {mainImage 
            ? <img src={mainImage} alt="main" />
            : <div style={{height: '200px', background: '#eee', borderRadius: '12px'}} />
          }
        </div>

        <div className="detail-layout">

          <div>
            <p className="detail-description">{apartment.description}</p>
            <hr className="detail-divider" />

            <h2 className="detail-rooms-title">Stanze disponibili</h2>
            {apartment.rooms.map(room => (
              <div
                key={room.id}
                className={`detail-room ${selectedRoom?.id === room.id ? 'selected' : ''}`}
                onClick={() => setSelectedRoom(room)}
              >
                <div className="detail-room-row">
                  <div>
                    <div className="detail-room-name">{room.name}</div>
                    <div className="detail-room-info">
                      Max {room.max_guests} ospiti · {room.num_beds} letto · {room.num_bathrooms} bagno
                    </div>
                  </div>
                  <div className="detail-room-price">
                    €{room.price_per_night}<span>/notte</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="detail-booking-box">
            <div className="detail-booking-price">
              €{selectedRoom?.price_per_night}<span> / notte</span>
            </div>

            <div className="detail-booking-dates">
              <div className="detail-booking-dates-row">
                <div className="detail-booking-field">
                  <div className="detail-booking-field-label">Check-in</div>
                  <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
                </div>
                <div className="detail-booking-field">
                  <div className="detail-booking-field-label">Check-out</div>
                  <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
                </div>
              </div>
              <div className="detail-booking-field">
                <div className="detail-booking-field-label">Ospiti</div>
                <input
                  type="number"
                  min="1"
                  max={selectedRoom?.max_guests}
                  value={numGuests}
                  onChange={e => setNumGuests(e.target.value)}
                />
              </div>
            </div>

            <button
              className={`detail-booking-btn ${checkIn && checkOut ? 'active' : 'disabled'}`}
              onClick={handleBooking}
              disabled={!checkIn || !checkOut}
            >
              Prenota
            </button>

            {numNights > 0 && (
              <div className="detail-booking-summary">
                <div className="detail-booking-summary-row">
                  <span>€{selectedRoom?.price_per_night} × {numNights} notti</span>
                  <span>€{totalPrice}</span>
                </div>
                <div className="detail-booking-summary-total">
                  <span>Totale</span>
                  <span>€{totalPrice}</span>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Detail