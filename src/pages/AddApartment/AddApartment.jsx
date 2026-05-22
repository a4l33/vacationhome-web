import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createApartment } from '../../api/apartments'
import './AddApartment.css'

function AddApartment() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
    country: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    createApartment(formData)
      .then(() => {
        alert('Appartamento aggiunto!')
        navigate('/')
      })
      .catch(err => alert(`Errore: ${err.message}`))
  }

  const isValid = formData.name && formData.city

  return (
    <div className="add-page">

      <div className="add-navbar">
        <button className="add-back-btn" onClick={() => navigate('/')}>
          ← Torna alla lista
        </button>
      </div>

      <div className="add-content">
        <h1 className="add-title">Aggiungi appartamento</h1>
        <p className="add-subtitle">Inserisci i dettagli della tua proprietà</p>

        <div className="add-form">

          <div className="add-field">
            <label>Nome proprietà</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="es. Garden Apartment"
            />
          </div>

          <div className="add-field">
            <label>Descrizione</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descrivi la tua proprietà..."
              rows={4}
            />
          </div>

          <div className="add-field">
            <label>Indirizzo</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="es. Via Roma 12"
            />
          </div>

          <div className="add-row">
            <div className="add-field">
              <label>Città</label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="es. Roma"
              />
            </div>
            <div className="add-field">
              <label>Paese</label>
              <input
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="es. Italia"
              />
            </div>
          </div>

          <hr className="add-divider" />

          <button
            className={`add-submit-btn ${isValid ? 'active' : 'disabled'}`}
            onClick={handleSubmit}
            disabled={!isValid}
          >
            Aggiungi appartamento
          </button>

        </div>
      </div>
    </div>
  )
}

export default AddApartment