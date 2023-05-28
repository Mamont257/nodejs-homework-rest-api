const Contact = require("../models/contact");

const { Wrapper } = require("../decorators/wrapper");
const { HttpError } = require("../helpers");

async function getAllContacts(req, res) {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  });
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
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
}

async function deleteContact(req, res) {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "contact deleted",
  });
}

async function putContact(req, res) {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
}

async function updateStatusContact(req, res) {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
}

module.exports = {
  getAllContacts: Wrapper(getAllContacts),
  getContactById: Wrapper(getContactById),
  postContact: Wrapper(postContact),
  deleteContact: Wrapper(deleteContact),
  putContact: Wrapper(putContact),
  updateStatusContact: Wrapper(updateStatusContact),
};
