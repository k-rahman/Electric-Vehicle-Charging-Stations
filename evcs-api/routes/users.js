const express = require('express');
const router = express.Router();
const db = require('../db/index');
const bcrypt = require('bcrypt');

// get user
router.get('/', (req, res) => {
  db.query('SELECT * FROM users')
    .then(users => {
      res.send(users);
    })
});

// register a user 
router.post('/', (req, res) => {
  console.log(req.body);
  const {name, email, password} = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  const newUser = [
    null,
    name,
    email,
    hashedPassword,
  ];

  db.query('SELECT email FROM users WHERE email= ?', email)
    .then(email => {
      if (email.length > 0) return res.status(400).send('Email already exists');

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