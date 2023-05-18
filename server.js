const mongoose = require("mongoose");

const app = require("./app");

const DB_HOST =
  "mongodb+srv://Volodymyr:qwertyv@cluster0.jedymrz.mongodb.net/mu_contacts?retryWrites=true&w=majority";
mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    })
  )
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
