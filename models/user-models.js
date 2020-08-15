const db = require('../data/dbConfig');

function getAllUsers() {
  return db('users').select('id', 'email').orderBy('id');
}

function findOneBy(filter) {
  return db('users').where(filter).first();
}

async function add(user) {
  const [id] = await db('users').insert(user);
  return findOneBy({ id });
}

module.exports = { getAllUsers, findOneBy, add };
