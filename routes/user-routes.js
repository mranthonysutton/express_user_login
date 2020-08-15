const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();
const Users = require('../models/user-models');
const { validateUserCreation } = require('../middleware/schemaValidation');
const { userAlreadyExists, foundUser } = require('../middleware/users');

router.get('/', async (req, res, next) => {
  try {
    return res.json(await Users.getAllUsers());
  } catch (error) {
    next(error);
  }
});

router.post(
  '/register',
  validateUserCreation,
  userAlreadyExists,
  async (req, res, next) => {
    try {
      const newUser = await Users.add({
        ...req.validUser,
        password: bcrypt.hashSync(req.validUser.password, 12),
      });

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  },
);

router.post('/login', foundUser, async (req, res, next) => {
  try {
    const validPassword = await bcrypt.compare(
      req.body.password,
      req.foundUser.password,
    );

    if (!validPassword) return res.status(404).json({ message: 'Invalid credentials' });

    const token = await signToken(req.foundUser);

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
});

function signToken(user) {
  const payload = {
    user_id: user.id,
    email: user.email,
  };

  const secret = process.env.JWT_SECRET || 'secretkey';

  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
