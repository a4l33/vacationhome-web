import AutoCompileLocation from './AutoCompileLocation'
import './Steps.css'

function StepOne({ formData, onChange, onAddressSelect, onSubmit, isValid }) {

  // ─── Render ──────────────────────────────────────────────
  return (
    <>
      <p className="add-subtitle">Step 1 — Inserisci i dettagli della tua proprietà</p>

      <div className="add-form">
        <div className="add-section">
          <p className="add-section-title">📍 Posizione</p>

          <div className="add-field">
            <label>Indirizzo completo</label>
            <AutoCompileLocation
              placeholder="es. Via Roma 12, Roma"
              types={['address']}
              onSelect={onAddressSelect}
            />
          </div>

          <div className="add-row">
            <div className="add-field add-field-readonly">
              <label>Città</label>
              <input name="city" value={formData.city} onChange={onChange} placeholder="Compilato automaticamente" />
            </div>
            <div className="add-field add-field-readonly">
              <label>Paese</label>
              <input name="country" value={formData.country} readOnly placeholder="Compilato automaticamente" />
            </div>
          </div>
        </div>

        <div className="add-section">
          <p className="add-section-title">🏠 Proprietà</p>

          <div className="add-field">
            <label>Nome proprietà</label>
            <input name="name" value={formData.name} onChange={onChange} placeholder="es. Garden Apartment" />
          </div>

          <div className="add-field">
            <label>Descrizione</label>
            <textarea name="description" value={formData.description} onChange={onChange} placeholder="Descrivi la tua proprietà..." rows={4} />
          </div>
        </div>
      </div>

      <hr className="add-divider" />

      <div className="step-submit-row">
        <button className={`add-submit-btn ${isValid ? 'active' : 'disabled'}`} onClick={onSubmit} disabled={!isValid}>
          Avanti →
        </button>
      </div>
    </>
  )
}

export default StepOne