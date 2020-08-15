const knex = require('knex');
const knexfile = require('../knexfile');

const setup = process.env.DB_CONFIG || 'development';

module.exports = knex(knexfile[setup]);
