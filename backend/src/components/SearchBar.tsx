import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void; // Function type for handling search
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value); // Call the onSearch function when input changes
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search products..."
      />
    </div>
  );
};

export default SearchBar;
