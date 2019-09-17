const server = require('./api/server');

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

// const express = require('express');
// const helmet = require('helmet');
// const cors = require('cors');
// const bcrypt = require('bcryptjs');
// const session = require('express-session');
// const KnexSessionStore = require('connect-session-knex')(session);

// const db = require('./database/dbConfig.js');
// const Users = require('./users/users-model.js');
// const restricted = require('./auth/restricted-middleware.js');
// const dbConnection = require('./database/dbConfig.js');

// const server = express();

// const sessionConfig = {
//   name: 'cookiemonster',
//   secret: process.env.SESSION_SECRET || 'keep it secret, keep it safe',
//   cookie: {
//     maxAge: 1000 * 60 * 60,
//     secure: false,
//     httpOnly: true,
//   },
//   resave: false,
//   saveUninitialized: true,
//   store: new KnexSessionStore({
//     knex: dbConnection,
//     createtable: true,
//     clearInterval: 1000 * 60 * 30,
//   })
// }

// server.use(helmet());
// server.use(express.json());
// server.use(cors());
// server.use(session(sessionConfig))

// server.get('/', (req, res) => {
//   res.send("It's alive!");
// });

// server.post('/api/register', (req, res) => {
//   let {username, password} = req.body;
//   const hash = bcrypt.hashSync(password, 14)
//   Users.add({username, password: hash})
//     .then(saved => {
//       res.status(201).json(saved);
//     })
//     .catch(error => {
//       res.status(500).json(error);
//     });
// });

// server.post('/api/login', (req, res) => {
//   let { username, password } = req.body;
  
//   Users.findBy({ username })
//     .first()
//     .then(user => {
//       if (user && bcrypt.compareSync(password, user.password)) {
//         req.session.user = user;
//         res.status(200).json({ message: `Welcome ${user.username}!` });
//       } else {
//         res.status(401).json({ message: 'Invalid Credentials' });
//       }
//     })
//     .catch(error => {
//       res.status(500).json(error);
//     });
// });

// server.get('/api/users', restricted, (req, res) => {
//   Users.find()
//     .then(users => {
//       res.json(users);
//     })
//     .catch(err => res.send(err));
// });

// server.get('/hash', (req, res) => {
//   const name = req.query.name;
//   const hash = bcrypt.hashSync(name, 14);
//   res.send(`the hash for ${name} is ${hash}`);
// });

// server.get('/logout', (req, res) => {
//   if(req.session) {
//     req.session.destroy(error => {
//       if(error) {
//         res.status(500).json({message: 'try again'})
//       }else{
//         res.status(200).json({message: 'bye'})
//       }
//     });
//   }else{
//     res.status(200).json({message: 'already logged out'})
//   }
// })

// const port = process.env.PORT || 5000;
// server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));