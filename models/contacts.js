const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContact = async (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);
  await updateContact(contacts);
  return result;
}

async function addContact(data) {
  const contact = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };

  contact.push(newContact);
  await updateContact(contact);
  return newContact;
}

const updateContactById = async (contactId, body) => {
  const movies = await listContacts();
  const index = movies.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  movies[index] = { contactId, ...body };
  await updateContact(movies);
  return movies[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
