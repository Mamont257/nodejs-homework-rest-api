const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      if (!Object.keys(error._original).length) {
        next(HttpError(400, "missing fields"));
      }
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

module.exports = {
  validateBody,
};
