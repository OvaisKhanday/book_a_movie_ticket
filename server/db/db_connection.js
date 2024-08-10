const mongoose = require("mongoose");

async function connectDB() {
  const mongoURI = `${process.env.DB_URL}${process.env.DB_NAME}`;
  mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("connection established with mongodb server online");
    })
    .catch((err) => {
      console.error("error while connection", err.message);
      throw new Error("Failed To Connect");
    });
}

module.exports = connectDB;
