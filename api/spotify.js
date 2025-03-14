/* Spotify API Calls */
const express = require("express");
const spotify_router = express.Router();
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.configDotenv();
// const queryString = require("querystring");

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;

// const redirect_uri = "http://localhost:3000/spotify/callback";
// const redirect_uri = "https://express-backend-api-one.vercel.app/spotify/callback";

const express_access_token_header = {
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
      express_access_token_header
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
spotify_router.get("/albumtracks", async (req, res) => {
  // const id = req.query.input;
  const id = "1btWGBz4Uu1HozTwb2Lm8A";

  try {
    const access_token = await getAccessToken();
    const auth_header = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      timeout: 10000,
    };
    const albums = await axios.get(
      `https://api.spotify.com/v1/albums/${id}/tracks&limit=20`,
      auth_header
    );

    res.json(albums.data.items);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
});

// // generate a random string for security
// function generateRandomString(length) {
//   let result = "";
//   const characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   const charactersLength = characters.length;
//   let counter = 0;
//   while (counter < length) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     counter += 1;
//   }
//   return result;
// }

// // authorize user to login to their spotify account
// spotify_router.get("/login", async (req, res) => {
//   let state = generateRandomString(16);

//   let scope = "user-read-private user-read-email";
//   res.redirect(
//     "https://accounts.spotify.com/authorize?" +
//       queryString.stringify({
//         response_type: "code",
//         client_id: spotify_client_id,
//         scope: scope,
//         redirect_uri: redirect_uri,
//         state: state,
//       })
//   );
// });

// // authorization callback function
// spotify_router.get("/callback", async (req, res) => {
//   let code = req.query.code || null;
//   let state = req.query.state || null;

//   if (state === null) {
//     res.redirect("/#" + queryString.stringify({ error: "state_mismatch" }));
//   } else {
//     let authOptions = {
//       url: "https://accounts.spotify.com/api/token",
//       form: {
//         code: code,
//         redirect_uri: redirect_uri,
//         grant_type: "authorization_code",
//       },
//       headers: {
//         "content-type": "application/x-www-form-urlencoded",
//         Authorization:
//           "Basic " +
//           new Buffer.from(
//             spotify_client_id + ":" + spotify_client_secret
//           ).toString("base64"),
//       },
//       json: true,
//     };

//     const user = await axios.post(authOptions.url, authOptions.form, {
//       headers: authOptions.headers,
//     });

//     const access_token = await user.data.access_token;
//     const userProfile = getProfile(access_token);
//     res.json(userProfile);
//   }
// });

// async function getProfile(user_access_token) {
//   // get current Users spotify id

//   const response = await axios.get("https://api.spotify.com/v1/me", {
//     headers: {
//       Authorization: "Bearer " + user_access_token,
//     },
//   });

//   const data = await response.json();

//   return data;
// }

module.exports = spotify_router;
