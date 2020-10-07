const express = require('express');
const router = express.Router();
const db = require('../db/index');


// router.get('/', (req, res) => {
//   db
//     .query('SELECT * FROM locations')
//     .then(result => {
//       res.send(result);
//      })
//     .catch(err => {
//       console.log(err);
//     })
//     });
    
    router.get('/', (req, res) => {
  db
    .query('SELECT l.id, name, address, lat, lng, img'
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

  // db.query('SELECT JSON_OBJECT("id", l.id, "name", l.name, "address", l.address, "lat", l.lat'
  //   + ', "lng", l.lng, "img", l.img, "stations", JSON_ARRAYAGG(JSON_OBJECT("id", s.id, "code", s.code, "type", s.type'
  //   + ', "outlets", JSON_ARRAY(JSON_OBJECT("id", o.id, "status", o.status' 
  //   + ', "power", o.power, "connector", c.name, "payment", p.payment, "unit", p.unit)))))'
  //   + ' as location'
  //   + ' FROM locations as l'
  //   + ' JOIN stations as s ON l.id = s.location'
  //   + ' JOIN outlets as o ON s.id = o.station'
  //   + ' JOIN connectors as c ON c.id = o.connector'
  //   + ' JOIN prices as p on p.id = o.price'
  //   + ' GROUP BY l.id;')
  //   .then(result => {
  //     console.log(result)
  //     const parsedResult = [];
  //     result.forEach(location => {
  //       for (let data in location) {
  //         parsedResult.push(JSON.parse(location[data]));
  //       }
  //     });
  //     res.send(parsedResult);
  //   })
  //   .catch(err => console.log(err));
  // )};

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db
    .query('SELECT * FROM locations WHERE Locations.id = ?', id)
    .then(result => {
      console.log(result);
      res.send(result[0]);
    })
    .catch(error => {
      console.log(error)
    });
  });


//       db.query('SELECT JSON_OBJECT("id", l.id, "name", l.name, "address", l.address, "lat", l.lat'
//     + ', "lng", l.lng, "img", l.img, "stations", JSON_ARRAYAGG(JSON_OBJECT("id", s.id, "code", s.code, "type", s.type'
//     + ', "outlets", JSON_ARRAY(JSON_OBJECT("id", o.id, "status", o.status' 
//     + ', "power", o.power, "connector", c.name, "payment", p.payment, "unit", p.unit)))))'
//     + ' as location'
//     + ' FROM locations as l'
//     + ' JOIN stations as s ON l.id = s.location'
//     + ' JOIN outlets as o ON s.id = o.station'
//     + ' JOIN connectors as c ON c.id = o.connector'
//     + ' JOIN prices as p on p.id = o.price'
//     + ' WHERE l.id = ?'
//     + ' GROUP BY l.id;', id)
//     .then(result => {
//       const parsedResult = [];
//       result.forEach(location => {
//         for (let data in location) {
//           parsedResult.push(JSON.parse(location[data]));
//         }
//       });
//       res.send(parsedResult[0]);
//     })
//     .catch(err => console.log(err));
// });

module.exports = router;
