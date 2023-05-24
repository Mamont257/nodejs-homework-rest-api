const express = require("express");
const router = express.Router();

const { validateBody } = require("../../decorators/validateBody");
const { registeredSchema } = require("../../models/user");
const authController = require("../../controllers/auth");

router.post(
  "/users/register",
  validateBody(registeredSchema),
  authController.registerUser
);

module.exports = router;
