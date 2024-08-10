const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const seatSchema = new Schema({
  A1: { type: Schema.Types.Number, required: true },
  A2: { type: Schema.Types.Number, required: true },
  A3: { type: Schema.Types.Number, required: true },
  A4: { type: Schema.Types.Number, required: true },
  D1: { type: Schema.Types.Number, required: true },
  D2: { type: Schema.Types.Number, required: true },
});

const bookMovieSchema = new Schema({
  movie: { type: Schema.Types.String, required: true },
  slot: { type: Schema.Types.String, required: true },
  seats: { type: seatSchema, required: true },
});
const BookMovieCollection = mongoose.model("bookmovietickets", bookMovieSchema);

module.exports = BookMovieCollection;
