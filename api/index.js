const express = require("express");
const spotify_router = require("./spotify");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => res.send("Express on Vercel"));

// /* Spotify API Calls */
// app.use("/spotify", spotify_router);

/* The Movie Database API Calls */

/* Market Stack API Calls */

app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));

module.exports = app;
