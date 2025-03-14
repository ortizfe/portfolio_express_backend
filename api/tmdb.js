const express = require("express");
const tmdb_router = express.Router();
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.configDotenv();

const tmdb_token = process.env.TMDB_TOKEN;
const tmdb_key = process.env.TMDB_KEY;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${tmdb_token}`,
  },
};

tmdb_router.get("/", (req, res) => {
  res.send("TMDB api");
});

tmdb_router.get("/movie_genres", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      options
    );

    console.log(response);
    const movieGenresList = response.data.genres;
    res.json(movieGenresList);
  } catch (error) {
    console.error(`Error message: ${error.message}`);
  }
});

tmdb_router.get("/tv_genres", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/genre/tv/list?language=en",
      options
    );

    const tvGenresList = response.data.genres;
    res.json(tvGenresList);
  } catch (error) {
    console.error(`Error message: ${error.message}`);
  }
});

tmdb_router.get("/movies", async (req, res) => {
  // const adult = false;
  const genres = req.query.input;
  // const genres = "99";
  const rating = 7.0;

  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genres}&vote_average.gte=${rating}`;

  try {
    const response = await axios.get(url, options);

    res.json(response.data);
  } catch (error) {
    console.error(`Error message: ${error.message}`);
  }
});

tmdb_router.get("/movie_details", async (req, res) => {
  // const id = "62101";
  const id = req.query.input;
  console.log(id);

  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;

  try {
    const response = await axios.get(url, options);

    res.json(response.data);
  } catch (error) {
    console.error(`Error message: ${error.message}`);
  }
});

tmdb_router.get("/tv", async (req, res) => {
  // const adult = false;
  const genres = req.query.input;
  // const genres = "99";
  const rating = 7.0;

  const url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genres}&vote_average.gte=${rating}`;

  try {
    const response = await axios.get(url, options);

    res.json(response.data);
  } catch (error) {
    console.error(`Error message: ${error.message}`);
  }
});

tmdb_router.get("/tv_details", async (req, res) => {
  // const id = "62101";
  const id = req.query.input;

  const url = `https://api.themoviedb.org/3/tv/${id}?language=en-US`;

  try {
    const response = await axios.get(url, options);

    res.json(response.data);
  } catch (error) {
    console.error(`Error message: ${error.message}`);
  }
});

tmdb_router.get("/random_movie", async (req, res) => {
  const adult = true;
  const genres = "Action,Comedy,Crime";
  const rating = 8.0;

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?language=en&include_adult=${adult}&vote_average.gte=${rating}&with_genres=${genres}`,
      options
    );

    const genresList = response.data.genres;
    res.json(response.data);
  } catch (error) {
    console.error(`Error message: ${error.message}`);
  }
});

module.exports = tmdb_router;
