/* Spotify API Calls */
const express = require("express");
const spotify_router = express.Router();
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.configDotenv();

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;

const access_token_header = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  timeout: 10000,
};

async function getAccessToken() {
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      `grant_type=client_credentials&client_id=${spotify_client_id}&client_secret=${spotify_client_secret}`,
      access_token_header
    );

    return response.data.access_token;
  } catch (error) {
    console.error(
      "Error getting access token: ",
      error.response?.data || error.message
    );
  }
}

// searching spotify for albums
spotify_router.get("/search/albums", async (req, res) => {
  const userAlbumArray = req.query.input;

  try {
    const access_token = await getAccessToken();
    const auth_header = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      timeout: 10000,
    };

    const album = userAlbumArray[0];
    const market = userAlbumArray[1];

    const search = await axios.get(
      `https://api.spotify.com/v1/search?q=${album}&type=album&market=${market}&limit=30`,
      auth_header
    );

    res.json(search.data.albums);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
});

// searching spotify for artists
spotify_router.get("/search/artists", async (req, res) => {
  const userArtistArray = req.query.input;

  try {
    const access_token = await getAccessToken();
    const auth_header = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      timeout: 10000,
    };

    const artist = userArtistArray[0];
    const market = userArtistArray[1];

    const search = await axios.get(
      `https://api.spotify.com/v1/search?q=${artist}&type=artist&market=${market}&limit=11`,
      auth_header
    );

    res.json(search.data.artists);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
});

// getting artist by artist ID
spotify_router.get("/artist", async (req, res) => {
  const id = req.query.input;
  // const id = "1btWGBz4Uu1HozTwb2Lm8A";
  try {
    const access_token = await getAccessToken();
    const auth_header = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      timeout: 10000,
    };

    const artist = await axios.get(
      `https://api.spotify.com/v1/artists/${id}`,
      auth_header
    );

    res.json(artist.data);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
});

// get an artists albums
spotify_router.get("/albums", async (req, res) => {
  const id = req.query.input;
  // const id = "1btWGBz4Uu1HozTwb2Lm8A";

  try {
    const access_token = await getAccessToken();
    const auth_header = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      timeout: 10000,
    };
    const albums = await axios.get(
      `https://api.spotify.com/v1/artists/${id}/albums?include_groups=album&limit=6`,
      auth_header
    );

    res.json(albums.data.items);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
});

module.exports = spotify_router;
