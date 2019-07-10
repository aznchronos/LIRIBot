require("dotenv").config({ path: "./.env" });

var request = require("request");
var Spotify = require("node-spotify-api");
var dotenv = require("dotenv");
var fs = require("fs");
// var Twitter = require("twitter");
var keys = require("./keys.js");

var action = process.argv[2];
var variable = process.argv[3];

if (action == "concert-this") {
    console.log("concert-this");
    
} else if (action == "spotify-this-song") {
    console.log("spotify-this-song");
    if (variable == undefined) {
        variable = "The Sign by Ace of Base"
    }
    getSpotify(variable);

} else if (action == "movie-this") {
    console.log("movie-this");
    if (variable == undefined) {
        variable = "Mr. Nobody"
    } else {
        variable = process.argv[3];
    }
    movie(variable);
} else if (action == "do-what-it-says") {
    console.log("do-what-it-says");
    getRandom();
} else {
    console.log("Did you forget the action?")
}

function getConcert(variable) {
    var concertKey = keys.
    console.log("I got into Concert");
    request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function(err, response, body){
      if(!error && response.statusCode == 200){
          console.log("\nName of the Venue: ".padEnd(28) + JSON.parse(body).Title +
          "\nVenue Location: ".padEnd(28) + JSON.parse(body).Year +
          "\nDate of the Event: ".padEnd(28) + JSON.parse(body).Rated)
      }  
    })
}

function getSpotify(variable) {
    var myid = keys.spotify.id;
    var mysecret = keys.spotify.secret;
    var spotify = new Spotify({
        id: myid,
        secret: mysecret
    });

    spotify.search({
        type: "track",
        query: variable,
        limit: 10
    }, function (err, data) {
        if (err) {
            return console.log(err);
        } else if (data){
            console.log("\nArtist(s) Name: ".padEnd(28) + data.tracks.items[0].album.artists[0].name +
                "\nSong Title: ".padEnd(28) + data.tracks.items[0].name +
                "\nPreview: ".padEnd(28) + data.tracks.items[0].preview_url +
                "\nAlbum Title: ".padEnd(28) + data.tracks.items[0].album.name
            )
        }
    })
}

function getRandom(){
    fs.readFile("random.txt", "UTF8", function(err, data){
        var RandomChoices = data.split(", ");
        // Random choices between 0 - 2
        var command = Math.floor((Math.random()*3));
        var choice = Math.floor((Math.random() * RandomChoices.length))
        if(command == 0){
            getConcert(RandomChoices[choice]);
        } else if(command == 1){
            getMovie(RandomChoices[choice]);
        } else if(command == 2){
            getSpotify(RandomChoices[choice]);
        }
    })
}