const express = require("express");

const contactsController = require("../../controllers/contact-controller");

const schemas = require("../../schemas/contactSchema");

const { validateBody } = require("../../decorators/validateBody");

const router = express.Router();

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", contactsController.getContactById);

router.post(
  "/",
  validateBody(schemas.contactValidateSchema),
  contactsController.postContact
);

router.delete("/:contactId", contactsController.deleteContact);

router.put(
  "/:contactId",
  validateBody(schemas.contactValidateSchema),
  contactsController.putContact
);

module.exports = router;
