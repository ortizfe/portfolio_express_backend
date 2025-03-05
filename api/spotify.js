/* Spotify API Calls */
const express = require("express");
const spotify_router = express.Router();
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.configDotenv();

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;

const access_token_header = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
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
spotify_router.get("/search/albums", cors(), async (req, res) => {
  try {
    const access_token = await getAccessToken();
    const auth_header = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      timeout: 10000,
    };

    const album = "Flood";
    const market = "US";

    const search = await axios.get(
      `https://api.spotify.com/v1/search?q=${album}&type=album&market=${market}&limit=10`,
      auth_header
    );

    res.json(search.data.albums);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
});

// getting artist by artist ID
spotify_router.get("/artist", async (req, res) => {
  try {
    const access_token = await getAccessToken();
    const auth_header = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      timeout: 10000,
    };

    const artist = await axios.get(
      `https://api.spotify.com/v1/artists/1btWGBz4Uu1HozTwb2Lm8A`,
      auth_header
    );

    res.json(artist.data);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
});

// get artists albums
spotify_router.get("/albums", async (req, res) => {
  try {
    const access_token = await getAccessToken();
    const auth_header = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      timeout: 10000,
    };
    const albums = await axios.get(
      `https://api.spotify.com/v1/artists/1btWGBz4Uu1HozTwb2Lm8A/albums?include_groups=album`,
      auth_header
    );

    res.json(albums.data.items);

    res.json(artist.data);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
});

module.exports = spotify_router;
