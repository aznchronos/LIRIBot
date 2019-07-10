console.log('this is loaded');
require("dotenv").config({path: "./.env"})

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};