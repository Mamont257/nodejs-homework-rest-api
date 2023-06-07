const express = require("express");
const router = express.Router();

const { validateBody } = require("../../decorators/validateBody");
const { registeredSchema } = require("../../models/user");
const authController = require("../../controllers/auth");
const authenticate = require("../../middlewares/authenticate");
const upload = require("../../middlewares/upload");

router.post(
  "/register",
  validateBody(registeredSchema),
  authController.registerUser
);

router.post("/login", validateBody(registeredSchema), authController.loginUser);

router.post("/logout", authenticate, authController.logoutUser);

router.get("/current", authenticate, authController.currentUser);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authController.updateAvatarsUser
);

module.exports = router;
