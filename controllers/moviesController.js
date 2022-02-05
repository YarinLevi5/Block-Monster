let Movie = require("../models/movie");

let addMovie = (movieObj) => {
  return new Promise((resolve, reject) => {
    let movie = new Movie(movieObj);
    movie.save((err, newMovie) => {
      err ? reject(err) : resolve(newMovie);
    });
  });
};

let getAllMovies = () => {
  return new Promise((resolve, reject) => {
    Movie.find({}, (err, movie) => {
      err ? reject(err) : resolve(movie);
    });
  });
};

let getMovie = (_id) => {
  return new Promise((resolve, reject) => {
    Movie.findOne({ _id }, (err, movie) => {
      err ? reject(err) : resolve(movie);
    });
  });
};
let updateMovie = (_id, updateMovie) => {
  return new Promise((resolve, reject) => {
    Movie.findOneAndUpdate({ _id }, { $set: updateMovie }, (err, movie) => {
      err ? reject(err) : resolve(movie);
    });
  });
};

module.exports = {
  addMovie,
  getAllMovies,
  getMovie,
  updateMovie,
};
