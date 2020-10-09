const express = require('express');
const router = express.Router();
const db = require('../db/index');

// get history by userID
router.get('/:id', (req, res) => {
  const {id} = req.params;

  db.query('SELECT h.id, h.charge_time as date, SEC_TO_TIME(h.charge_duration MOD 86400) as duration'
          + ' , h.energy_used as energy, h.cost, l.name FROM history AS h'
          + ' JOIN locations AS l ON location = l.id'
          + ' WHERE user = ?', id)
    .then(userHistory => {
      res.send(userHistory);
    })
    .catch(e => {
      console.log(e)
      res.sendStatus(500)});
});

// insert history by userID
router.post('/', (req, res) => {
  const {time, duration, energy, cost, user, location} = req.body;
  const historyEntry = [
    null,
    time,
    duration,
    energy,
    cost,
    user,
    location
  ];

  db.query('INSERT INTO history VALUES (?, ?, ?, ?, ?, ?, ?)', historyEntry)
    .then(result => res.sendStatus(201))
    .catch(e => {
      console.log(e);
      res.sendStatus(500)
    });
});


module.exports = router;

