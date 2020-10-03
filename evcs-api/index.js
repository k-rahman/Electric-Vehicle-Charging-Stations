const helmet = require('helmet');
const cors = require('cors');
const express = require('express');
const db = require('./db');
const locations = require('./routes/locations');
const app = express();

const PORT = process.env.PORT || 3200;

app.use(express.static('public'));
app.use(express.json());
app.use(helmet());
app.use(cors());

app.use('/api/locations', locations);

/* DB init */
Promise.all(
  [
    db.query('USE EVCS')
    // Add more table create statements if you need more tables
  ]
).then(() => {
  console.log('Database connection is openedّّ successfully!');
  app.listen(PORT, () => console.log(`Server is up and listening on ${PORT}...`));
})
  .catch(error => console.log(error));
