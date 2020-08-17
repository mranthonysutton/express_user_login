const jwt = require('jsonwebtoken');

const requireToken = async (req, res, next) => {
  const { authorization } = req.headers;
  const secret = process.env.JWT_SECRET;

  if (!authorization)
    return res.status(401).json({ message: 'No token provided' });

  jwt.verify(authorization, secret, (error, validToken) => {
    if (error) return res.status(401).json({ message: 'Invalid token' });
    req.token = validToken;
    next();
  });
};

module.exports = { requireToken };
