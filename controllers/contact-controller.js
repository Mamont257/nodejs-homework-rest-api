// const { HttpError } = require("../helpers");
const Contact = require("../models/contact");

const { Wrapper } = require("../decorators/wrapper");
const { HttpError } = require("../helpers");

async function getAllContacts(req, res) {
  const result = await Contact.find();
  // console.log(result);
  res.json(result);
}

async function getContactById(req, res) {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
}

async function postContact(req, res) {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
}

async function deleteContact(req, res) {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
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
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
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
