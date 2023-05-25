const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");
const { Wrapper } = require("../decorators/wrapper");
const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

async function registerUser(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcryptjs.hash(password, 10);

  const { subscription = "starter" } = await User.create({
    ...req.body,
    password: hashPassword,
  });
  res.status(201).json({ user: { email: email, subscription: subscription } });
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCorrect = await bcryptjs.compare(password, user.password);
  if (!passwordCorrect) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  res.json({
    token,
    user: { email: email, subscription: user.subscription },
  });
}

module.exports = {
  registerUser: Wrapper(registerUser),
  loginUser: Wrapper(loginUser),
};
