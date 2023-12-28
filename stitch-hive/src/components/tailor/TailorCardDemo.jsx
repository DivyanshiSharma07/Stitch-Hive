import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import TailorCard from './TailorCard';

const TailorCardDemo = () => {
  const [tailors, setTailors] = useState([]);

  useEffect(() => {
    // Make an HTTP GET request to fetch tailor data from your API
    Axios.get('http://localhost:4000/tailors') // Update with your server URL
      .then((response) => {
        setTailors(response.data); // Set the fetched tailor data in state
      })
      .catch((error) => {
        console.error('Error fetching tailor data:', error);
      });
  }, []);

  return (
    <div>
      {tailors.map((tailor, index) => (
        <TailorCard key={index} tailor={tailor} />
      ))}
    </div>
  );
};

export default TailorCardDemo;
