import React, { useState } from 'react';

const FilterSidebar = ({ categories, onCategorySelect }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState('All');
  const [rating, setRating] = useState('All');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onCategorySelect(category); // Notify parent about the category selection
  };

  const handlePriceChange = (e) => {
    setPriceRange(e.target.value);
    // Optionally, dispatch an action or push this data to the backend
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
    // Optionally, dispatch an action or push this data to the backend
  };

  return (
    <div className="filter-sidebar">
      <h3>Filters</h3>
      <div className="filter-category">
        <h4>Categories</h4>
        <ul>
          {categories.map((category) => (
            <li
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={selectedCategory === category ? 'selected' : ''}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
      <div className="filter-price">
        <h4>Price Range</h4>
        <select value={priceRange} onChange={handlePriceChange}>
          <option value="All">All</option>
          <option value="<50">$0 - $50</option>
          <option value="50-100">$50 - $100</option>
          <option value="100-200">$100 - $200</option>
          <option value=">200">$200+</option>
        </select>
      </div>
      <div className="filter-rating">
        <h4>Rating</h4>
        <select value={rating} onChange={handleRatingChange}>
          <option value="All">All</option>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSidebar;
