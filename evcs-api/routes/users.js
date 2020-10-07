const express = require('express');
const router = express.Router();
const db = require('../db/index');
const bcrypt = require('bcrypt');

// get user
router.get('/', (req, res) => {
  db.query('SELECT * FROM users')
    .then(results => {
      res.send(results);
    })
});

// register a user 
router.post('/', (req, res) => {
  const body = req.body;
  body.password = bcrypt.hashSync(body.password, 8);
  const newUser = [
    null,
    body.name,
    body.email,
    body.password,
  ];

  db.query('SELECT email FROM users WHERE email= ?', body.email)
    .then(results => {
      if (results.length > 0) return res.status(400).send('Email already exists');

      db.query('INSERT INTO users VALUES (?,?,?,?)', newUser)
        .then(() => res.sendStatus(201))
        .catch(err => {
          console.log(err);
          res.sendStatus(500);
        });
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500)
    });
});

module.exports = router;