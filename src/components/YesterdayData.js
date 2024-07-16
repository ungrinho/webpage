import React, { useState, useEffect } from 'react';
import axios from 'axios';

function YesterdayData() {
  const [yesterdayData, setYesterdayData] = useState({ avg_temperature: null, avg_humidity: null });

  useEffect(() => {
    const { avg_temperature, avg_humidity } = yesterdayData
    axios.get('http://localhost:8080/api/yesterdaySummary', {
      ...yesterdayData
    }).then((retval) => {
      console.log("success!", retval.data[0].avgHumidity)
      yesterdayData.avg_temperature = retval.data[0].avgTemperature
      yesterdayData.avg_humidity = retval.data[0].avgHumidity
      console.log(avg_temperature)
    }).catch((retval) => {
      console.log("Error@@", retval)
    })
  }, [yesterdayData]);

  if (!yesterdayData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>온도: {yesterdayData.avg_temperature}°C</p>
      <p>습도: {yesterdayData.avg_humidity}%</p>
    </div>
  );
}

export default YesterdayData;