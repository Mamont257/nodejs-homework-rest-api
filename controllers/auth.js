const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const path = require("path");
const fs = require("fs/promises");

const { User } = require("../models/user");
const { Wrapper } = require("../decorators/wrapper");
const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const avatarDir = path.join(__dirname, "../", "public", "avatars");

async function registerUser(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcryptjs.hash(password, 10);
  const avatarURL = gravatar.url("email");

  const { subscription = "starter" } = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
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

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: { email: email, subscription: user.subscription },
  });
}

async function logoutUser(req, res) {
  const { _id } = req.user;
  console.log(_id);
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
}

async function currentUser(req, res) {
  const { subscription, email } = req.user;

  res.json({ email, subscription });
}

async function updateAvatarsUser(req, res) {
  const { _id } = req.user;

  const { path: tempUpload, originalname } = req.file;
  const fileName = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarDir, fileName);
  await fs.rename(tempUpload, resultUpload);

  Jimp.read(resultUpload, (err, avatar) => {
    if (err) throw err;
    avatar
      .resize(250, 250) // resize
      .write(resultUpload); // save
  });

  const avatarURL = path.join("avatars", fileName);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
}

module.exports = {
  registerUser: Wrapper(registerUser),
  loginUser: Wrapper(loginUser),
  logoutUser: Wrapper(logoutUser),
  currentUser: Wrapper(currentUser),
  updateAvatarsUser: Wrapper(updateAvatarsUser),
};
