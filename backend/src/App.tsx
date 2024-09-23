import React, { useState } from 'react';
import ProductList from './components/ProductList';
import SearchBar from './components/SearchBar';

// Sample products data
const sampleProducts = [
  { id: 1, name: 'Product 1', thumbnail: 'url_to_image_1' },
  { id: 2, name: 'Product 2', thumbnail: 'url_to_image_2' },
  // Add more products as needed
];

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <h1>Product Listing</h1>
      <SearchBar onSearch={handleSearch} />
      <ProductList products={sampleProducts} searchQuery={searchQuery} />
    </div>
  );
};

export default App;
