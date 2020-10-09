const helmet = require('helmet');
const cors = require('cors');
const express = require('express');
const db = require('./db/index');
const locations = require('./routes/locations');
const users = require('./routes/users');
const stations = require('./routes/stations');
const outlets = require('./routes/outlets');
const auth = require('./routes/auth');
const activate = require('./routes/activate');
const app = express();

const PORT = process.env.PORT || 3200;

app.use(express.static('public'));
app.use(express.json());
app.use(helmet());
app.use(cors());

app.use('/api/locations', locations);
app.use('/api/locations/stations', stations);
app.use('/api/locations/stations/outlets', outlets);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/activate', activate);

/* DB init */
// Promise.all(
//   [
//     db.query('USE EVCS')
//     // Add more table create statements if you need more tables
//   ]
// ).then(() => {
// })
//   .catch(error => console.log(error));

  console.log('Database connection is openedّّ successfully!');
  app.listen(PORT, () => console.log(`Server is up and listening on ${PORT}...`));