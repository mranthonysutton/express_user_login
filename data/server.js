const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const UsersRouter = require('../routes/user-routes');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan('dev'));

server.use('/api/users', UsersRouter);

server.use('/', (req, res) => {
  res.json({ message: 'API up and running...' });
});

server.use('/', (error, req, res) => {
  console.log(error);
  res.status(500).json({ error: 'Something went wrong', stack: error.stack });
});

module.exports = server;
