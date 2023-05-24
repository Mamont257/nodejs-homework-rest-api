const bcryptjs = require("bcryptjs");

const { User } = require("../models/user");
const { Wrapper } = require("../decorators/wrapper");
const { HttpError } = require("../helpers");

async function registerUser(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcryptjs.hash(password, 10);
  console.log(password);
  console.log(hashPassword);

  const { subscription = "starter" } = await User.create({
    ...req.body,
    password: hashPassword,
  });
  res.status(201).json({ user: { email: email, subscription: subscription } });
}

module.exports = {
  registerUser: Wrapper(registerUser),
};
