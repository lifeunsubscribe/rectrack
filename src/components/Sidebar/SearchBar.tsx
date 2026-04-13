interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/**
 * SearchBar - Text input for filtering clients by name
 */
function SearchBar({ value, onChange, placeholder = 'Search clients...' }: SearchBarProps) {
  return (
    <div className="search-bar" style={{ padding: '0 16px 12px 16px' }}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="search-bar__input"
        style={{
          width: '100%',
          padding: '8px 12px',
          fontSize: '14px',
          border: '1px solid #34495e',
          borderRadius: '4px',
          backgroundColor: '#34495e',
          color: '#ecf0f1',
          outline: 'none',
        }}
        aria-label="Search clients"
      />
    </div>
  );
}

export default SearchBar;
