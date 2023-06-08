const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

async function sendEmail(data) {
  const email = { ...data, from: "velnaza@gmail.com" };
  await sgMail.send(email);
  return true;
}

module.exports = sendEmail;
