const express = require("express");

const contactsController = require("../../controllers/contact-controller");

const schemas = require("../../schemas/contactSchema");

const { validateBody } = require("../../decorators/validateBody");

const isValidId = require("../../middlewares/isValidId");
const authenticate = require("../../middlewares/authenticate");

const router = express.Router();

router.get("/", authenticate, contactsController.getAllContacts);

router.get(
  "/:contactId",
  authenticate,
  isValidId,
  contactsController.getContactById
);

router.post(
  "/",
  authenticate,
  validateBody(schemas.contactValidateSchema),
  contactsController.postContact
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  contactsController.deleteContact
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.contactValidateSchema),
  contactsController.putContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavorite),
  contactsController.updateStatusContact
);

module.exports = router;
