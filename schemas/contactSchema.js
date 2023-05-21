const Joi = require("joi");

const contactValidateSchema = Joi.object({
  name: Joi.string()
    .messages({ "any.required": "missing required name field" })
    .required(),
  email: Joi.string()
    .messages({ "any.required": "missing required email field" })
    .required(),
  phone: Joi.string()
    .messages({ "any.required": "missing required phone field" })
    .required(),
  favorite: Joi.boolean(),
});

const updateFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  contactValidateSchema,
  updateFavorite,
};
