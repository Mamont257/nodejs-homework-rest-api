const express = require("express");

const contactService = require("../../models/contacts");

const { HttpError } = require("../../helpers");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await contactService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactService.getContactById(contactId);

    if (!result) {
      throw HttpError(404, "Contact not found");
      // const error = new Error("Contact not found");
      // error.status = 404;
      // throw error;
      // return res.status(404).json({ message: "Contact not found" });
    }
    res.json(result);
  } catch (error) {
    next(error);
    // const { message = "Server error", status = 500 } = error;
    // res.status(status).json({ message });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const result = await contactService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

// router.delete("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

// router.put("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

module.exports = router;
