import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ApartmentCard from '../../components/ApartmentCard/ApartmentCard'
import { getApartments } from '../../api/apartments'
import Navbar from '../../components/Navbar/Navbar'
import SearchBar from '../../components/SearchBar/SearchBar'
import './Archive.css'

function Archive() {
  const navigate = useNavigate()

  //  State 
  const [apartments, setApartments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const pageSize = 10

  //  Fetch dati 
  useEffect(() => {
    getApartments(currentPage, '', searchQuery) // vai a prendere gli appartamenti da Django, anche quando cambi pagina o cerchi qualcosa
      .then(data => {
        setApartments(data.results) 
        setTotalCount(data.count)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [currentPage, searchQuery])

  //  Handlers 
  const totalPages = Math.ceil(totalCount / pageSize)

  //  Render 
  return (
    <div className="archive-page">
      <Navbar />

      <div className="archive-content">

        <SearchBar
          value={searchQuery}
          placeholder="Cerca per nome..."
          onChange={e => {
            setSearchQuery(e.target.value)
            setCurrentPage(1)
          }}
        />

        <div className="archive-header">
          <h2>I tuoi appartamenti</h2>
          <button className="archive-add-btn" onClick={() => navigate('/add')}>
            + Aggiungi
          </button>
        </div>

        {loading && <p className="archive-message">Caricamento...</p>}
        {error && <p className="archive-message error">{error}</p>}

        <div className="archive-list">
          {apartments.map(apartment => (
            <ApartmentCard 
              key={apartment.id}                                        // ← prop
              apartment={apartment}                                     // ← prop
              onClick={() => navigate(`/apartment/${apartment.id}`)}    // ← prop
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