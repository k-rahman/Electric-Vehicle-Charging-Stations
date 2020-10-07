const express = require('express');
const router = express.Router();
const db = require('../db/index');

// get all outlets
router.get('/', (req, res) => {
  db.query('SELECT * FROM outlets')
    .then(results => {
      res.send(results);
    })
});

// get outlet by station id
router.get('/:id', (req, res) => {
  const { id } = req.params;

  db.query('SELECT o.id, o.code,  o.status, o.power, o.station, c.name, c.img, p.payment, p.unit'
  + ' FROM outlets as o'
  + ' JOIN stations as s ON s.id = o.station'
  + ' JOIN connectors as c ON c.id = o.connector'
  + ' JOIN prices as p ON p.id = o.price'
  + ' WHERE s.id = ?'
  + ' GROUP BY o.id', id)
    .then(results => {
      res.send(results);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;