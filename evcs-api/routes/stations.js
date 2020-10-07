const express = require('express');
const router = express.Router();
const db = require('../db/index');

router.get('/', (req, res) => {
  db.query('SELECT * FROM stations')
    .then(results => {
      res.send(results);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
});


router.get('/:id', (req, res) => {
   const { id } = req.params;
  db.query('SELECT JSON_ARRAYAGG(JSON_OBJECT("id", s.id, "code", s.code, "type", s.type'
    + ', "outlets", JSON_ARRAY(JSON_OBJECT("id", o.id, "status", o.status' 
    + ', "power", o.power, "connector", c.name, "payment", p.payment, "unit", p.unit))))'
    + ' as stations'
    + ' FROM stations as s'
    + ' JOIN locations as l ON l.id = s.location'
    + ' LEFT JOIN outlets as o ON s.id = o.station'
    + ' LEFT JOIN connectors as c ON c.id = o.connector'
    + ' LEFT JOIN prices as p on p.id = o.price'
    + ' WHERE l.id = ?'
    + ' GROUP BY l.id', id)
    .then(result => {
      console.log(result)
      const parsedResult = [];
      result.forEach(station => {
        for (let data in station) {
          parsedResult.push(JSON.parse(station[data]));
        }
      });
      console.log(parsedResult);
      res.send(parsedResult[0]);
    })
    .catch(err => console.log(err));
  });


// router.get('/:id', (req, res) => {
//   const { id } = req.params;

//   db.query('SELECT * FROM stations WHERE location = ?', id)
//     .then(results => {
//       res.send(results);
//       console.log(results);
//     })
//     .catch(err => {
//       console.log(err);
//       res.sendStatus(500);
//     });
// });


module.exports = router;