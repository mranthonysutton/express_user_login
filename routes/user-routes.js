const express = require("express");
const router = express.Router();
const Users = require("../models/user-models");
const { validateUserCreation } = require("../middleware/schemaValidation");
const { userAlreadyExists } = require("../middleware/users");

router.get("/", async (req, res, next) => {
  try {
    return res.json(await Users.getAllUsers());
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  validateUserCreation,
  userAlreadyExists,
  async (req, res, next) => {
    try {
      const newUser = await Users.add(req.validUser);

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
