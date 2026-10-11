
import { useState,useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
   const searchRef = useRef(null);
   const[showSuggestions, setShowSuggestions] = useState(false);
   const[selectedIndex, setSelectedIndex] = useState(-1);

   useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target)
    ) {
      setShowSuggestions(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);
  // List of possible search suggestions
  const suggestionsList = [
    'react tutorial',
    'react projects',
    'react interview questions',
    'javascript tutorial',
    'web development',
    'html and css',
    'programming for beginners',
    'frontend development'
  ];

  // Filter suggestions according to what the user types
  const filteredSuggestions = searchTerm.trim()
    ? suggestionsList.filter((suggestion) =>
        suggestion.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

const handleKeyDown = (e) => {
  if (!showSuggestions || filteredSuggestions.length === 0) {
    return;
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    setSelectedIndex((prev) =>
      prev < filteredSuggestions.length - 1 ? prev + 1 : 0
    );
  }

  if (e.key === 'ArrowUp') {
    e.preventDefault();
    setSelectedIndex((prev) =>
      prev > 0 ? prev - 1 : filteredSuggestions.length - 1
    );
  }

  if (e.key === 'Enter' && selectedIndex >= 0) {
    e.preventDefault();
    const selectedSuggestion = filteredSuggestions[selectedIndex];
    setSearchTerm(selectedSuggestion);
    setShowSuggestions(false);
    navigate(`/search/${encodeURIComponent(selectedSuggestion)}`);
  }
};

const handleSubmit = (e) => {
  e.preventDefault();

  if (selectedIndex >= 0 && showSuggestions &&
      filteredSuggestions[selectedIndex]) {
    const selectedSuggestion = filteredSuggestions[selectedIndex];
    setShowSuggestions(false);
    navigate(`/search/${encodeURIComponent(selectedSuggestion)}`);
  } else if (searchTerm.trim()) {
    navigate(`/search/${encodeURIComponent(searchTerm.trim())}`);
  }
};


  return (
    <div ref={searchRef} 
    style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          borderRadius: 20,
          border: '1px solid #e3e3e3',
          pl: 2,
          boxShadow: 'none',
          mr: { sm: 5 },
          display: 'flex',
          alignItems: 'center'
        }}
      >
        
<input
  className="search-bar"
  placeholder="Search..."
  value={searchTerm}
onKeyDown={handleKeyDown}
  onChange={(e) => {
    setSearchTerm(e.target.value);
    setSelectedIndex(-1); // Reset selected index when user types       
    setShowSuggestions(true);
  
  }}
  style={{
    color: '#000000',
    WebkitTextFillColor: '#000000',
    caretColor: '#000000',
    backgroundColor: 'transparent'
  }}
/>

        <IconButton type="submit" sx={{ p: '10px', color: 'red' }}>
          <Search />
        </IconButton>
      </Paper>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <Paper
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            mt: 1,
            zIndex: 10,
            borderRadius: 2,
            overflow: 'hidden',
            backgroundColor: '#212121',
            color: 'white'
          }}
        >
          {filteredSuggestions.map((suggestion, index) => (
            <div
              key={suggestion}
              onClick={() => {
                setSearchTerm(suggestion);
                setShowSuggestions(false);
                navigate(`/search/${encodeURIComponent(suggestion)}`);
              }}
              style={{
                padding: '12px 16px',
                cursor: 'pointer',
                backgroundColor: selectedIndex === index ? '#383838' : 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#383838';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Search style={{ fontSize: 18, marginRight: 12, verticalAlign: 'middle' }} />
              {suggestion}
            </div>
          ))}
        </Paper>
      )}
    </div>
  );
};

export default SearchBar;