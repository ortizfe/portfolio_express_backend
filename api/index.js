const express = require("express");
const app = express();
// import axios from "axios";
// import dotenv from "dotenv";
// dotenv.configDotenv();

// /* Spotify API Calls */
// const spotify_client_id = import.meta.env.SPOTIFY_CLIENT_ID;
// const spotify_client_secret = import.meta.env.SPOTIFY_CLIENT_SECRET;

// const access_token_header = {
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded",
//   },
// };

// const access_token = await axios.post(
//   "https://accounts.spotify.com/api/token",
//   `grant_type=client_credentials&client_id=${spotify_client_id}&client_secret=${spotify_client_secret}`,
//   access_token_header
// );

// const auth_header = {
//   headers: {
//     Authorization: `Bearer ${access_token.data.access_token}`,
//   },
// };

// // getting artist by artist ID
// app.get("/artist", async (req, res) => {
//   const artist = await axios.get(
//     `https://api.spotify.com/v1/artists/1btWGBz4Uu1HozTwb2Lm8A`,
//     auth_header
//   );
//   res.json(artist.data);
// });

// // get artists albums
// app.get("/artist/albums", async (req, res) => {
//   const albums = await axios.get(
//     `https://api.spotify.com/v1/artists/1btWGBz4Uu1HozTwb2Lm8A/albums?include_groups=album`,
//     auth_header
//   );

//   res.json(albums.data.items);
// });

/* The Movie Database API Calls */

/* Market Stack API Calls */

app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
