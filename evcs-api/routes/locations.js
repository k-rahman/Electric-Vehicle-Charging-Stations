const express = require('express');
const router = express.Router();
const db = require('../db/index');

// get all locations
router.get('/', (req, res) => {
  db.query('SELECT l.id, name, address, lat, lng, img'
    + ', JSON_ARRAYAGG(JSON_OBJECT("id", s.id)) as stations'
    + ' FROM locations as l'
    + ' INNER JOIN stations as s ON l.id = s.location'
    + ' GROUP BY l.id')
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    })
})

// get location by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db
    .query('SELECT * FROM locations WHERE locations.id = ?', id)
    .then(result => {
      console.log(result);
      res.send(result[0]);
    })
    .catch(error => {
      console.log(error)
    });
});


module.exports = router;
