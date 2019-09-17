const router = require('express').Router();
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig');
const Users = require('../users/users-model');
const restricted = require('./restricted-middleware');

router.post('/register', (req, res) => {
  let {username, password} = req.body;
  const hash = bcrypt.hashSync(password, 14)
  Users.add({username, password: hash})
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;
  
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/users', restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

router.get('/logout', (req, res) => {
  if(req.session) {
    req.session.destroy(error => {
      if(error) {
        res.status(500).json({message: 'Try again'})
      }else{
        res.status(200).json({message: 'Come back soon.'})
      }
    });
  }else{
    res.status(200).json({message: 'Already logged out'})
  }
})

module.exports = router;