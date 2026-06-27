import { useState } from 'react'
import './AutoCompileLocation.css'

function AutoCompileLocation({ onSelect, placeholder = 'es. Via Roma 12, Roma', types = ['address'] }) {

  //  State 
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  //  Handlers 
  const fetchSuggestions = (input) => {
    if (input.length < 2) {
      setShowSuggestions(false)
      return
    }
    const service = new window.google.maps.places.AutocompleteService()
    service.getPlacePredictions(
      { input, types, componentRestrictions: { country: 'it' }, language: 'it' },
      (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
          setSuggestions(predictions)
          setShowSuggestions(true)
        } else {
          setShowSuggestions(false)
        }
      }
    )
  }

  const handleSelect = (prediction) => {
    setValue(prediction.description)
    setShowSuggestions(false)
    const geocoder = new window.google.maps.Geocoder()
    geocoder.geocode({ placeId: prediction.place_id }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const components = results[0].address_components
        const get = (type) => components.find(c => c.types.includes(type))?.long_name || ''
        onSelect({
          address: `${get('route')} ${get('street_number')}`.trim(),
          city: get('locality') || get('administrative_area_level_2'),
          country: get('country'),
        })
      }
    })
  }

  // Render 
  return (
    <div className="autocomplete">
      <input
        type="text"
        value={value}
        onChange={e => { setValue(e.target.value); fetchSuggestions(e.target.value) }}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
        placeholder={placeholder}
        autoComplete="off"
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="city-suggestions">
          {suggestions.map((s, i) => (
            <li key={i} onMouseDown={() => handleSelect(s)}>
              <strong>{s.structured_formatting.main_text}</strong>
              <span className="autocomplete-suggestion-secondary">
                {s.structured_formatting.secondary_text}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AutoCompileLocation