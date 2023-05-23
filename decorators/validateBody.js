const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const empty = Object.keys(error._original).length;

      if (req.method === "POST" || (req.method === "PUT" && !empty)) {
        next(HttpError(400, "missing fields"));
      }
      if (req.method === "PATCH" && !empty) {
        next(HttpError(400, "missing field favorite"));
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
