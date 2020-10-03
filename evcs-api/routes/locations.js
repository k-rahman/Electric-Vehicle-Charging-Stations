const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/', (req, res) => {
  db
    .query('SELECT * FROM Locations')
    .then(result => {
      res.send(result);
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db
    .query('SELECT * FROM Locations WHERE id = ?', id)
    .then(result => {
      res.send(result[0]);
    })
    .catch(error => console.log(error));
});






module.exports = router;
