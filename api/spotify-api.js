// import { useState, useEffect } from "react";
import axios from "axios";
import dotenv from "dotenv";
dotenv.configDotenv();

const client_id = import.meta.env.SPOTIFY_CLIENT_ID;
const client_secret = import.meta.env.SPOTIFY_CLIENT_SECRET;

const access_token_header = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

const access_token = await axios.post(
  "https://accounts.spotify.com/api/token",
  `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`,
  access_token_header
);

const auth_header = {
  headers: {
    Authorization: `Bearer ${access_token.data.access_token}`,
  },
};

// getting artist by artist ID
app.get("/artist", async (req, res) => {
  const artist = await axios.get(
    `https://api.spotify.com/v1/artists/${req.artistID}`,
    auth_header
  );
  res.json(artist.data);
});

// get artists albums
app.get("/artist/albums", async (req, res) => {
  const albums = await axios.get(
    `https://api.spotify.com/v1/artists/${request.artistID}/albums?include_groups=album`,
    auth_header
  );

  res.json(albums.data.items);
});
