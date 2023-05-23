const express = require("express");

const contactsController = require("../../controllers/contact-controller");

const schemas = require("../../schemas/contactSchema");

const { validateBody } = require("../../decorators/validateBody");

const isValidId = require("../../middlewares/isValidId");

const router = express.Router();

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", isValidId, contactsController.getContactById);

router.post(
  "/",
  validateBody(schemas.contactValidateSchema),
  contactsController.postContact
);

router.delete("/:contactId", isValidId, contactsController.deleteContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.contactValidateSchema),
  contactsController.putContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavorite),
  contactsController.updateStatusContact
);

module.exports = router;
