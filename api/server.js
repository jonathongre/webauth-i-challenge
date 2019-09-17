const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const authRouter = require('../auth/auth-router.js');
const dbConnection = require('../database/dbConfig.js');

const server = express();

const sessionConfig = {
  name: 'cookiemonster',
  secret: process.env.SESSION_SECRET || 'keep it secret, keep it safe',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: true,
  store: new KnexSessionStore({
    knex: dbConnection,
    createtable: true,
    clearInterval: 1000 * 60 * 30,
  })
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig))

server.use('/api', authRouter);
server.get('/', (req, res) => {
    res.json({ api: 'up' });
});

module.exports = server;