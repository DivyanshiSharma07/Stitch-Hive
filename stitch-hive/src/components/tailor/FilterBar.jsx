import React, { useState } from 'react';
import './FilterBar.css';

function FilterBar({ onFilterChange }) {
  const [filters, setFilters] = useState({
    experience: false,
    price: false,
    ratings: false,
    deadline: false,
    services: false,
    nearby: false,
  });

  const [subFilters, setSubFilters] = useState({
    experience: {
      '0-1 years': false,
      '1-2 years': false,
      '2-3 years': false,
      '3+ years': false,
    },
    price: {
      '0-50': false,
      '51-100': false,
      '101-200': false,
      '201+': false,
    },
    ratings: {
      '1-2': false,
      '2-3': false,
      '3-4': false,
      '4+': false,
    },
    deadline: {
      '1 week': false,
      '2 weeks': false,
      '3 weeks': false,
      '4+ weeks': false,
    },
    services: {
      'Tailoring': false,
      'Alterations': false,
      'Custom Suits': false,
      'Hemming': false,
      // Add more services as needed
    },
    nearby: {
      'Nearby Option 1': false,
      'Nearby Option 2': false,
      'Nearby Option 3': false,
      // Add more nearby options as needed
    },
  });

  const handleFilterChange = (filterName) => {
    const updatedFilters = { ...filters, [filterName]: !filters[filterName] };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleSubFilterChange = (filterType, filterName) => {
    const updatedSubFilters = { ...subFilters[filterType], [filterName]: !subFilters[filterType][filterName] };
    setSubFilters({ ...subFilters, [filterType]: updatedSubFilters });
    // Apply the sub-filters to your data here
  };

  const renderSubFilterBar = (filterType, subFilterOptions) => {
    return (
      filters[filterType] && (
        <div className={`sub-filter-bar ${filters[filterType] ? 'show' : ''}`}>
          {Object.keys(subFilterOptions).map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                checked={subFilters[filterType][option]}
                onChange={() => handleSubFilterChange(filterType, option)}
              />
              {option}
            </label>
          ))}
        </div>
      )
    );
  };

  return (
    <div className="filter-bar">
      <label onClick={() => handleFilterChange('experience')}>
        <input
          type="checkbox"
          checked={filters.experience}
        />
        Experience
        
      </label>
      
      {renderSubFilterBar('experience', subFilters.experience)}
     

      <label onClick={() => handleFilterChange('price')}>
        <input
          type="checkbox"
          checked={filters.price}
        />
        Price
      </label>
      {renderSubFilterBar('price', subFilters.price)}

      <label onClick={() => handleFilterChange('ratings')}>
        <input
          type="checkbox"
          checked={filters.ratings}
        />
        Ratings
      </label>
      {renderSubFilterBar('ratings', subFilters.ratings)}

      <label onClick={() => handleFilterChange('deadline')}>
        <input
          type="checkbox"
          checked={filters.deadline}
        />
        Deadline
      </label>
      {renderSubFilterBar('deadline', subFilters.deadline)}

      <label onClick={() => handleFilterChange('services')}>
        <input
          type="checkbox"
          checked={filters.services}
        />
        Services
      </label>
      {renderSubFilterBar('services', subFilters.services)}

      <label onClick={() => handleFilterChange('nearby')}>
        <input
          type="checkbox"
          checked={filters.nearby}
        />
        Nearby
      </label>
      {renderSubFilterBar('nearby', subFilters.nearby)}
    </div>
  );
}

export default FilterBar;


