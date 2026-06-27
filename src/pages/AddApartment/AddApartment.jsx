import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createApartment } from '../../api/apartments'
import Navbar from '../../components/Navbar/Navbar'
import iconArrowLeft from '../../assets/icons/arrow-left.svg'
import StepOne from './StepOne'
import StepTwo from './StepTwo'

import './AddApartment.css'

function AddApartment() {
  const navigate = useNavigate()

  // STATE ---------------------------------

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
    country: '',
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [propertyId, setPropertyId] = useState(null) // salva l'Id della property creata per aggiungere stanze e img a Step 2

  // HANDLERS ------------------------------

  const isValid = formData.name && formData.city

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleAddressSelect = (data) => {
    setFormData(prev => ({
      ...prev,
      address: data.address,
      city: data.city,
      country: data.country
    }))
  }

  const handleSubmit = () => {
    createApartment(formData)
      .then(data => {
        setPropertyId(data.id)
        setCurrentStep(2)
      })
      .catch(err => alert(`Errore: ${err.message}`))
  }

  // RENDER -------------------------------

  return (
    <div className="add-page">
      <Navbar />

      <div className="add-content">
        <div className="add-title-row">
          <img src={iconArrowLeft} alt="torna indietro" className="add-back-icon" onClick={() => navigate('/')} />
          <h1 className="add-title">Aggiungi appartamento</h1>
        </div>

        {currentStep === 1 && (
          <StepOne
            formData={formData}
            onChange={handleChange}
            onAddressSelect={handleAddressSelect}
            onSubmit={handleSubmit}
            isValid={isValid}
          />
        )}

        {currentStep === 2 && (
          <StepTwo
            propertyId={propertyId}
            onComplete={() => navigate('/')}
            onBack={() => navigate('/')}
          />
        )}

      </div>
    </div>
  )
}

export default AddApartment