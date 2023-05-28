const express = require("express");
const router = express.Router();

const { validateBody } = require("../../decorators/validateBody");
const { registeredSchema } = require("../../models/user");
const authController = require("../../controllers/auth");
const authenticate = require("../../middlewares/authenticate");

router.post(
  "/users/register",
  validateBody(registeredSchema),
  authController.registerUser
);

router.post(
  "/users/login",
  validateBody(registeredSchema),
  authController.loginUser
);

router.post("/users/logout", authenticate, authController.logoutUser);

router.get("/users/current", authenticate, authController.currentUser);

module.exports = router;
