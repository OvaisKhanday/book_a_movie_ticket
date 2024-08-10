const express = require("express");
const { bookingRouter } = require("./routes/booking");
const connectDB = require("./db/db_connection");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.json());

app.use("/api", bookingRouter);

const port = process.env.PORT ?? 8080;
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log("App listening on port ", port);
    });
  })
  .catch((error) => {
    console.error(error.message);
    console.log("Cannot start server");
  });
