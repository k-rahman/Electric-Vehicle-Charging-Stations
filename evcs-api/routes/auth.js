const express = require('express');
const router = express.Router();
const db = require('../db/index');
const bcrypt = require('bcrypt');
const passport = require('passport');
const passportHttp = require('passport-http');


passport.use(new passportHttp.BasicStrategy((email, password, done) => {
  db.query('SELECT * FROM users WHERE email= ?', email)
    .then(user => {

      if (user.length === 0) return done(null, false);

      const validPassword = bcrypt.compareSync(password, user[0].password);
      if (!validPassword) return done(null, false);

      done(null, user);
    })
})
);

// login a user
router.post('/', (req, res, next) => {
  passport.authenticate('basic', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).send('Invalid email or password.');
    res.sendStatus(200);
  })(req, res, next);
});

module.exports = router;