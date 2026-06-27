import { useState } from 'react'
import { createRoom, uploadRoomImage } from '../../api/apartments'
import './Steps.css'

function StepTwo({ propertyId, onComplete }) {

  // ─── State ───────────────────────────────────────────────
  const [rooms, setRooms] = useState([])
  const [roomForm, setRoomForm] = useState({
    name: '',
    description: 'N/A',
    price_per_night: '',
    max_guests: '',
    num_beds: '',
    num_bathrooms: '',
  })

  // ─── Handlers ───────────────────────────────────────────
  const isValid = roomForm.name && roomForm.price_per_night !== '' && roomForm.max_guests !== ''

  const handleChange = (e) => {
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value
    setRoomForm({ ...roomForm, [e.target.name]: value })
  }

  const handleAddRoom = () => {
    createRoom(propertyId, roomForm)
      .then(data => {
        setRooms(prev => [...prev, { ...data, images: [] }])
        setRoomForm({ name: '', description: 'N/A', price_per_night: '', max_guests: '', num_beds: '', num_bathrooms: '' })
      })
      .catch(err => alert(`Errore: ${err.message}`))
  }

  const handleUploadImage = (roomId, file) => {
    uploadRoomImage(propertyId, roomId, file)
      .then(img => {
        setRooms(prev => prev.map(r =>
          r.id === roomId ? { ...r, images: [...r.images, img] } : r
        ))
      })
      .catch(err => alert(`Errore immagine: ${err.message}`))
  }

  // ─── Render ──────────────────────────────────────────────
  return (
    <>
      <p className="add-subtitle">Step 2 — Aggiungi le stanze</p>

      {rooms.map((room, i) => (
        <div key={i} className="add-section">
          <p className="add-section-title">🛏 {room.name}</p>
          <p className="room-meta">€{room.price_per_night}/notte · {room.max_guests} ospiti</p>

          {room.images.length > 0 && (
            <div className="room-images">
              {room.images.map((img, j) => (
                <img key={j} src={img.image} alt="" className="room-image-thumb" />
              ))}
            </div>
          )}

          <div className="add-field">
            <label>Aggiungi immagine</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={e => {
                Array.from(e.target.files).forEach(file => handleUploadImage(room.id, file))
            }}
            />
          </div>
        </div>
      ))}

      <div className="add-section">
        <p className="add-section-title">➕ {rooms.length > 0 ? 'Aggiungi un\'altra stanza' : 'Nuova stanza'}</p>

        <div className="add-field">
          <label>Nome stanza</label>
          <input name="name" value={roomForm.name} onChange={handleChange} placeholder="es. Camera doppia" />
        </div>

        <div className="add-row">
          <div className="add-field">
            <label>Prezzo / notte (€)</label>
            <input name="price_per_night" type="number" value={roomForm.price_per_night} onChange={handleChange} placeholder="es. 120" />
          </div>
          <div className="add-field">
            <label>Max ospiti</label>
            <input name="max_guests" type="number" value={roomForm.max_guests} onChange={handleChange} placeholder="es. 2" />
          </div>
        </div>

        <div className="add-row">
          <div className="add-field">
            <label>Letti</label>
            <input name="num_beds" type="number" value={roomForm.num_beds} onChange={handleChange} placeholder="es. 1" />
          </div>
          <div className="add-field">
            <label>Bagni</label>
            <input name="num_bathrooms" type="number" value={roomForm.num_bathrooms} onChange={handleChange} placeholder="es. 1" />
          </div>
        </div>
      </div>

      <hr className="add-divider" />

      <div className="step-submit-row">
        <button className={`add-submit-btn ${isValid ? 'active' : 'disabled'}`} onClick={handleAddRoom} disabled={!isValid}>
          + Aggiungi stanza
        </button>
        {rooms.length > 0 && (
          <button className="add-submit-btn active" onClick={onComplete}>
            Pubblica →
          </button>
        )}
      </div>
    </>
  )
}

export default StepTwo