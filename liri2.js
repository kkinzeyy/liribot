#!/usr/bin/env node

const command = process.argv[2];
const value = process.argv[3];
const axios = require("axios");
var Spotify = require("node-spotify-api");

var spotify = new Spotify({
  id: "efa21ee43f2a4018b1201d0eb12a530f",
  secret: "5d632855690f4981b9212071aad1a79e"
});

function spotifyThis(item) {
  spotify.search({ type: "track", query: "All the Small Things" }, function(
    err,
    data
  ) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    console.log(data);
  });
}
spotifyThis();

//node liri.js concert-this <artist/band here>

// https://rest.bandsintown.com/artists/ /events?app_id=codingbootcamp

function getBands(artist) {
  const url = "https://rest.bandsintown.com/artist/" + artist + "/events?";

  axios
    .get("/user", {
      params: {
        app_id: "codingbootcamp"
      }
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
}
switch (command) {
  case "concert-this":
    getBands(value);
  //todo
  case "spotify-this":
    spotifyThis(value);
    break;
  default:
    console.log("please enter a command");
}
if (command === "concert-this") {
  getBands(value);
}

if (command === "spotify-this") {
  spotifyThis(value);
}
