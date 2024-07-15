import React, { useState, useEffect } from 'react';
import axios from 'axios';

function YesterdayData() {
  const [yesterdayData, setYesterdayData] = useState(null);

  useEffect(() => {
    const fetchYesterdayData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/yesterday-data');
        setYesterdayData(response.data);
      } catch (error) {
        console.error('Error fetching yesterday data:', error);
      }
    };

    fetchYesterdayData();
  }, []);

  if (!yesterdayData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Yesterday's Average Data</h2>
      <p>Temperature: {yesterdayData.avg_temp.toFixed(2)}°C</p>
      <p>Humidity: {yesterdayData.avg_humidity.toFixed(2)}%</p>
    </div>
  );
}

export default YesterdayData;