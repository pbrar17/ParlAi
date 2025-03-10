"use client";

// src/pages/sports.js
import { useEffect, useState } from 'react';
import { getSports } from '../utils/api';

const SportsPage = () => {
  const [sportsData, setSportsData] = useState(null);

  useEffect(() => {
    const fetchSports = async () => {
      const data = await getSports();
      setSportsData(data); // Set the raw data from the getSports function
    };

    fetchSports();
  }, []);

  return (
    <div>
      <h1>Sports Data</h1>
      <pre>{JSON.stringify(sportsData, null, 2)}</pre> {/* Display the raw sports data */}
    </div>
  );
};

export default SportsPage;
