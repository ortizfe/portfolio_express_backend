const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const spotify_router = require("./spotify");

const app = express();
const PORT = 3000;

// Rate limiter: 20 requests per minute per IP
const spotifyRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  limit: 50, // Max 20 requests per IP
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: "Too many requests, please try again later.",
});
app.use(spotifyRateLimiter);
app.set("trust proxy", 1);
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://federico-portfolio-chi.vercel.app"
  );
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type",
    "Authorization"
  );
  next();
});

/* Set timeout for requests */
app.use(function (req, res, next) {
  req.setTimeout(20000, function () {
    console.log("Request has timed out.");
    res.send(408);
  });
  next();
});

app.get("/", (req, res) => res.send("Express on Vercel"));

// /* Spotify API Calls */
app.use("/spotify", spotify_router);

/* The Movie Database API Calls */

/* Market Stack API Calls */

app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));

module.exports = app;
