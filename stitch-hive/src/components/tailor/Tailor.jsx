import React, { useState } from 'react';
import TailorCardDemo from './TailorCardDemo';
import FilterBar from './FilterBar';


function Tailor() {
  const [appliedFilters, setAppliedFilters] = useState({
    experience: false,
    price: false,
    ratings: false,
    deadline: false,
    services: false,
    nearby: false,
  });

  const handleFilterChange = (newFilters) => {
    setAppliedFilters(newFilters);
    // You can apply these filters to your data here and re-render the card list.
  };

  return (
    <div>
      <div className='custom-bar-bg' style={{ float: 'left' }}>
        <FilterBar onFilterChange={handleFilterChange} />
      </div>
      <div style={{ marginLeft: '200px' }}>
        <TailorCardDemo appliedFilters={appliedFilters} />
      </div>
    </div>
  );
}

export default Tailor;


