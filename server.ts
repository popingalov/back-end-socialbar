const app = require("./app");
const mongoose = require("mongoose");

const { DB_HOST, PORT = 4000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log("Database try and we listen port 4000");
    })
  )
  .catch((error) => {
    console.log("Error", error.message);
    process.exit(1);
  });
