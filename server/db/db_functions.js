const BookMovieCollection = require("../models/bookMovie");

async function getLatestBookedMovie() {
  const movies = await BookMovieCollection.find({}).sort({ _id: -1 }).limit(1);
  return movies != null ? movies[0] : null;
}
async function bookMovie(movie) {
  const newMovieTicket = new BookMovieCollection(movie);
  const error = newMovieTicket.validateSync();
  if (error) throw new Error("invalid Movie");
  await newMovieTicket.save();
}

module.exports = {
  getLatestBookedMovie,
  bookMovie,
};
