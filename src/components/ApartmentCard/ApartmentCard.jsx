import './ApartmentCard.css'
import iconStar from '../../assets/icons/star.svg'

function ApartmentCard({ apartment, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <div
        className="card-image"
        style={{ backgroundImage: `url(${apartment.rooms?.[0]?.images?.[0]?.image || ''})` }}
      >
        {apartment.average_rating !== null && (
        <div className="card-rating">
          <img src={iconStar} alt="" /> {apartment.average_rating}
        </div>
        )}
      </div>

      <div className="card-body">
        <h3 className="card-name">{apartment.name}</h3>
        <p className="card-location">
          {apartment.city}{apartment.country ? `, ${apartment.country}` : ''}
        </p>
        <div className="card-footer">
          <span className="card-price">
            da <strong>€{Math.min(...apartment.rooms.map(r => r.price_per_night))}</strong> / notte 
          </span>
          <span className="card-badge">Disponibile</span>
        </div>
      </div>
    </div>
  )
}

export default ApartmentCard