import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getApartmentById, deleteApartment, updateApartment } from '../../api/apartments'
import Navbar from '../../components/Navbar/Navbar'
import iconHome from '../../assets/icons/home.svg'
import iconUsers from '../../assets/icons/users.svg'
import iconTrash from '../../assets/icons/trash.svg'
import iconArrowLeft from '../../assets/icons/arrow-left.svg'
import './Detail.css'

function Detail() {
  const { id } = useParams()
  const navigate = useNavigate()

  // ─── State ───────────────────────────────────────────────
  const [apartment, setApartment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [allImages, setAllImages] = useState([])
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [editing, setEditing] = useState(false)
  const [editForm, setEditForm] = useState({})

  // ─── Fetch dati ──────────────────────────────────────────
  useEffect(() => {
    getApartmentById(id)
      .then(data => {
        setApartment(data)
        const images = data.rooms.flatMap(r => r.images.map(img => img.image))
        setAllImages(images)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  // ─── Handlers ───────────────────────────────────────────
  const handleDelete = () => {
    if (window.confirm(`Eliminare "${apartment.name}"?`)) {
      deleteApartment(id)
        .then(() => navigate('/'))
        .catch(err => alert(`Errore: ${err.message}`))
    }
  }

  const handleEdit = () => {
    setEditForm({
      name: apartment.name,
      description: apartment.description,
      address: apartment.address,
      city: apartment.city,
      country: apartment.country,
    })
    setEditing(true)
  }

  const handleSave = () => {
    updateApartment(id, editForm)
      .then(() => {
        return getApartmentById(id)
      })
      .then(data => {
        setApartment(data)
        setEditing(false)
      })
      .catch(err => alert(`Errore: ${err.message}`))
  }

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value })
  }

  // ─── Loading / Error ─────────────────────────────────────
  if (loading) return <><Navbar /><p className="detail-message">Caricamento...</p></>
  if (error) return <><Navbar /><p className="detail-message error">{error}</p></>
  if (!apartment) return null

  // ─── Render ──────────────────────────────────────────────
  return (
    <div className="detail-page">
      <Navbar />

      <div className="detail-content">

        {/* ----------- Header ---------------- */}

        <div className="detail-header">
          <div className="detail-title-row">
            <img src={iconArrowLeft} alt="torna indietro" className="detail-back-icon" onClick={() => navigate('/')} />
            {editing ? (
              <input className="detail-edit-input" name="name" value={editForm.name} onChange={handleEditChange} />
            ) : (
              <h1 className="detail-title">{apartment.name}</h1>
            )}
          </div>
          <div className="detail-header-actions">
            {editing ? (
              <>
                <button className="detail-save-btn" onClick={handleSave}>Salva</button>
                <button className="detail-cancel-btn" onClick={() => setEditing(false)}>Annulla</button>
              </>
            ) : (
              <>
                <button className="detail-edit-btn" onClick={handleEdit}>Modifica</button>
                <button className="detail-delete-btn" onClick={handleDelete}>
                  <img src={iconTrash} alt="" /> Elimina
                </button>
              </>
            )}
          </div>
        </div>

        {/* ---------- Meta --------------------- */}

        <div className="detail-meta">
          {editing ? (
            <>
              <input className="detail-edit-input" name="city" value={editForm.city} onChange={handleEditChange} placeholder="Città" />
              <input className="detail-edit-input" name="country" value={editForm.country} onChange={handleEditChange} placeholder="Paese" />
              <input className="detail-edit-input" name="address" value={editForm.address} onChange={handleEditChange} placeholder="Indirizzo" />
            </>
          ) : (
            <>
              <span>{apartment.city}, {apartment.country}</span>
              <span>·</span>
              <span>{apartment.address}</span>
            </>
          )}
        </div>

        {/* -------------------- Stats ------------------------- */}

        <div className="detail-stats">
          <span className="detail-stat">
            <img src={iconHome} alt="" />
            {apartment.rooms.length} stanze
          </span>
          <span>·</span>
          <span className="detail-stat">
            <img src={iconUsers} alt="" />
            Max {Math.max(...apartment.rooms.map(r => r.max_guests))} ospiti
          </span>
        </div>

        {/* ----------- gallery + lightbox -------------- */}

        <div className="detail-gallery">
          {allImages.slice(0, 3).map((img, i) => (
            <div key={i} className="detail-gallery-item" onClick={() => { setLightboxIndex(i); setLightboxOpen(true) }}>
              <img src={img} alt="" />
              {i === 2 && allImages.length > 3 && (
                <div className="detail-gallery-more">+{allImages.length - 3}</div>
              )}
            </div>
          ))}
        </div>

        {lightboxOpen && (
          <div className="lightbox" onClick={() => setLightboxOpen(false)}>
            <button className="lightbox-prev" onClick={e => { e.stopPropagation(); setLightboxIndex(i => (i - 1 + allImages.length) % allImages.length) }}>←</button>
            <img src={allImages[lightboxIndex]} alt="" className="lightbox-img" onClick={e => e.stopPropagation()} />
            <button className="lightbox-next" onClick={e => { e.stopPropagation(); setLightboxIndex(i => (i + 1) % allImages.length) }}>→</button>
          </div>
        )}

        {/* --------------- Descrizione ----------------- */}

        {editing ? (
          <textarea className="detail-edit-textarea" name="description" value={editForm.description} onChange={handleEditChange} rows={4} />
        ) : (
          <p className="detail-description">{apartment.description}</p>
        )}

        <hr className="detail-divider" />

        {/* ---------------- Stanze ------------------- */}
        
        <h2 className="detail-rooms-title">Stanze</h2>
        {apartment.rooms.map(room => (
          <div key={room.id} className="detail-room">
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
    </div>
  )
}

export default Detail