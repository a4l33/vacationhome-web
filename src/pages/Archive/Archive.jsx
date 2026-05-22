import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ApartmentCard from '../../components/ApartmentCard/ApartmentCard'
import { getApartments } from '../../api/apartments'
import heroBg from '../../assets/header.jpg'

import './Archive.css'

function Archive() {
  const navigate = useNavigate()
  const [apartments, setApartments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null) 
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const pageSize = 10

  // DATI DAL BACKEND: -----------
  useEffect(() => {
    getApartments(currentPage) 
      .then(data => {
        setApartments(data.results) // il .results si usa come nome fisso standard di Django per leggere dati paginati 
        setTotalCount(data.count)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [currentPage])

  const totalPages = Math.ceil(totalCount / pageSize)


  return (
    <div className="archive-page">

      <div
        className="archive-hero"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="archive-hero-overlay" />
        <div className="archive-hero-text">
          <h1>Benvenuto a<br />VacationHome</h1>
          <p>Scegli il tuo appartamento</p>
        </div>
      </div>

      <div className="archive-content">
        <div className="archive-header">
          <h2>Appartamenti disponibili</h2>
          <button
            className="archive-add-btn"
            onClick={() => navigate('/add')}
          >
            + Aggiungi
          </button>
        </div>

        {loading && <p className="archive-message">Caricamento...</p>}
        {error && <p className="archive-message error">{error}</p>}

        <div className="archive-list">
          {apartments.map(apartment => (
            <ApartmentCard
              key={apartment.id}
              apartment={apartment}
              onClick={() => navigate(`/apartment/${apartment.id}`)}
            />
          ))}
        </div>

        {totalPages > 1 && (
      <div className="archive-pagination">
        <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1} className="pagination-btn">← Precedente</button>
        <span className="pagination-info">{currentPage} / {totalPages}</span>
        <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages} className="pagination-btn">Successiva →</button>
      </div>
    )}
      </div>

    </div>
  )
}

export default Archive