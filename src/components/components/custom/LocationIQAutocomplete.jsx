// components/LocationIQAutocomplete.jsx

import React, { useState } from 'react';

function LocationIQAutocomplete({ onSelect }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const apiKey = import.meta.env.VITE_LOCATIONIQ_API_KEY;

  const handleChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      try {
        const res = await fetch(
          `https://api.locationiq.com/v1/autocomplete?key=${apiKey}&q=${value}&limit=5&dedupe=1`
        );
        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        console.error("LocationIQ error:", err);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (place) => {
    setQuery(place.display_name);
    setSuggestions([]);
    if (onSelect) onSelect(place); // pass selected place to parent
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for a place"
        className="w-full border px-4 py-2 rounded shadow"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border w-full rounded mt-1 shadow-lg max-h-48 overflow-y-auto">
          {suggestions.map((place, index) => (
            <li
              key={index}
              onClick={() => handleSelect(place)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LocationIQAutocomplete;
