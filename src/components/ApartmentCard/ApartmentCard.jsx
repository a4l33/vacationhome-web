import './ApartmentCard.css'

function ApartmentCard({ apartment, onClick }) {
  return (
    <div
      className="card"
      onClick={onClick}
    >
      <div
        className="card-image"
        style={{ backgroundImage: `url(${apartment.hero || apartment.images?.[0]})` }}
      >
        <div className="card-rating">
          ★ {apartment.rating || '4.8'}
        </div>
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