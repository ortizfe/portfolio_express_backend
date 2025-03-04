const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const spotify_router = require("./spotify");

const app = express();
const PORT = 3001;

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
app.use(cors());

app.get("/", (req, res) => res.send("Express on Vercel"));

// /* Spotify API Calls */
app.use("/spotify", spotify_router);

/* The Movie Database API Calls */

/* Market Stack API Calls */

app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));

module.exports = app;
