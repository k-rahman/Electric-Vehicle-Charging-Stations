const express = require('express');
const router = express.Router({mergeParams: true});
const db = require('../db/index');

// get station by locationID
router.get('/', (req, res) => {
  const { locationId } = req.params;

  db.query('SELECT * FROM stations WHERE location = ?', locationId)
    .then(results => {
      res.send(results);
      console.log(results);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});


module.exports = router;