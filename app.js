const express = require("express");
(app = express()), (mongoose = require("mongoose")), (port = 3000);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

let {
  addMovie,
  getAllMovies,
  getMovie,
  updateMovie,
} = require("./controllers/moviesController");

app.get("/", (req, res) => {
  return res.json({ hello: "world" });
});

mongoose
  .connect("mongodb://0.0.0.0:27017/block-monster")
  .then(() => {
    app.listen(port, () => {
      console.info(`start server start listening on port ${port}`);
    });
  })
  .catch((err) => console.error(err));

app.post("/addMovie", (req, res) => {
  addMovie(req.body)
    .then((movie) => res.json(movie))
    .catch((err) => res.send(err));
});

app.get("/allMovies", (req, res) => {
  getAllMovies()
    .then((movie) => res.json(movie))
    .catch((err) => res.send(err));
});

app.get("/movie/:movieId", (req, res) => {
  getMovie(req.params.movieId)
    .then((movie) => res.json(movie))
    .catch((err) => res.send(err));
});

app.put("/updateMovie/:movieId", (req, res) => {
  updateMovie(req.params.movieId, req.body)
    .then((movie) => res.json(movie))
    .catch((err) => res.send(err));
});
