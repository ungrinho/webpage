const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name'
});

connection.connect();

app.get('/api/yesterday-data', (req, res) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const formattedDate = yesterday.toISOString().split('T')[0];

  const query = `
    SELECT AVG(temperature) as avg_temp, AVG(humidity) as avg_humidity
    FROM sensor_data
    WHERE DATE(timestamp) = ?
  `;

  connection.query(query, [formattedDate], (error, results) => {
    if (error) throw error;
    res.json(results[0]);
  });
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});