const knex = require('knex');
const knexfile = require('../knexfile');

const setup = process.env.DB_ENV || 'development';
module.exports = knex(knexfile[setup]);
