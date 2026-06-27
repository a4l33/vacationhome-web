import iconSearch from '../../assets/icons/search.svg'
import './SearchBar.css'

function SearchBar({ value, onChange, onSearch, placeholder = 'Cerca...' }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSearch) onSearch()
  }

  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
      <button className="searchbar-btn" onClick={onSearch}>
        <img src={iconSearch} alt="cerca" />
      </button>
    </div>
  )
}

export default SearchBar