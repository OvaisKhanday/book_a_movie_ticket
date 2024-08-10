const express = require("express");
const { bookMovie, getLatestBookedMovie } = require("../db/db_functions");

const router = express.Router();

router.post("/booking", async (req, res) => {
  const { movie, seats, slot } = req.body;
  try {
    await bookMovie({ movie, seats, slot });
    res.status(201).json({ message: "Movie added successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: "Invalid Data" });
  }
});

router.get("/booking", async (req, res) => {
  let movie = null;
  try {
    movie = await getLatestBookedMovie();
    res.status(200).json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "There was an error" });
  }
});

exports.bookingRouter = router;
