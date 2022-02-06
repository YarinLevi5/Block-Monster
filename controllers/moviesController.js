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

let getLastMovie = () => {
  return new Promise((resolve, reject) => {
    Movie.findOne({}, {}, { sort: { publish_date: 1 } }, (err, movie) => {
      err ? reject(err) : resolve(movie);
    });
  });
};
let getMovieByCountry = (origin_country) => {
  return new Promise((resolve, reject) => {
    Movie.findOne({ origin_country }, (err, movie) => {
      err ? reject(err) : resolve(movie);
    });
  });
};

function writeJson(movie) {
  fs.writeJson("movie.json", movie, (err) => {
    if (err) return console.error(err);
    console.log("success!");
  });
}

module.exports = {
  addMovie,
  getAllMovies,
  getMovie,
  updateMovie,
  getLastMovie,
  getMovieByCountry,
  writeJson,
};
