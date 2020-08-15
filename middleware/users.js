const db = require('../data/dbConfig');

const userAlreadyExists = async (req, res, next) => {
  try {
    const foundUser = await db('users')
      .where({ email: req.validUser.email })
      .first();

    if (foundUser)
      return res.status(401).json({ message: 'User already exists' });

    next();
  } catch (error) {
    next(error);
  }
};

const foundUser = async (req, res, next) => {
  try {
    const foundUser = await db('users')
      .where({ email: req.body.email })
      .first();

    if (!foundUser)
      return res.status(401).json({ message: 'User does not exist' });

    req.foundUser = foundUser;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { userAlreadyExists, foundUser };
