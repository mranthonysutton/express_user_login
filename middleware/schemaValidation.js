const Joi = require('@hapi/joi');

const userCreationSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required().trim(),

  password: Joi.string().min(8).required().trim(true),
});

const validateUserCreation = async (req, res, next) => {
  try {
    const result = await userCreationSchema.validateAsync(req.body);
    req.validUser = result;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.details });
  }
};

module.exports = { validateUserCreation };
