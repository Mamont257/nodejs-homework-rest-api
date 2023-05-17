const contactService = require("../models/contacts");
const { HttpError } = require("../helpers");

const { Wrapper } = require("../decorators/wrapper");

async function getAllContacts(req, res) {
  const result = await contactService.listContacts();
  res.json(result);
}

async function getContactById(req, res) {
  const { contactId } = req.params;
  const result = await contactService.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
}

async function postContact(req, res) {
  const result = await contactService.addContact(req.body);
  res.status(201).json(result);
}

async function deleteContact(req, res) {
  const { contactId } = req.params;
  const result = await contactService.removeContact(contactId);
  console.log(result);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "contact deleted",
  });
}

async function putContact(req, res) {
  const { contactId } = req.params;
  const result = await contactService.updateContactById(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.json(result);
}

module.exports = {
  getAllContacts: Wrapper(getAllContacts),
  getContactById: Wrapper(getContactById),
  postContact: Wrapper(postContact),
  deleteContact: Wrapper(deleteContact),
  putContact: Wrapper(putContact),
};
