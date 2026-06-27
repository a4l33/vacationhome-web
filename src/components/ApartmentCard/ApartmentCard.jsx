import { deleteApartment } from '../../api/apartments'
import iconTrash from '../../assets/icons/trash.svg'
import './ApartmentCard.css'

function ApartmentCard({ apartment, onClick, onDelete }) {

  // Handlers 
  const handleDelete = (e) => {
    e.stopPropagation()
    if (window.confirm(`Eliminare "${apartment.name}"?`)) {
      deleteApartment(apartment.id)
        .then(() => onDelete(apartment.id))
        .catch(err => alert(`Errore: ${err.message}`))
    }
  }

  // Render 
  return (
    <div className="card" onClick={onClick}>
      <div
        className="card-image"
        style={{ backgroundImage: `url(${apartment.rooms?.[0]?.images?.[0]?.image || ''})` }}
      >
        <div className="card-rating">
          ★ {apartment.rating || '4.8'}
        </div>
        {onDelete && (
          <button className="card-delete" onClick={handleDelete}>
            <img src={iconTrash} alt="elimina" />
          </button>
        )}
      </div>

      <div className="card-body">
        <h3 className="card-name">{apartment.name}</h3>
        <p className="card-location">
          {apartment.city}{apartment.country ? `, ${apartment.country}` : ''}
        </p>
        <div className="card-footer">
          <span className="card-price">
            da <strong>€{apartment.price_per_night}</strong> / notte
          </span>
          <span className="card-badge">Disponibile</span>
        </div>
      </div>
    </div>
  )
}

export default ApartmentCard