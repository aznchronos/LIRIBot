require("dotenv").config({ path: "./.env" });
var axios = require("axios");
var request = require("request");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var dotenv = require("dotenv");
var fs = require("fs");
// var Twitter = require("twitter");
var keys = require("./keys.js");

var action = process.argv[2];
var variable = process.argv[3];

if (action == "concert-this") {
    // console.log("concert-this");
    if (variable == undefined) {
        console.log("You're missing the artist");
    } else {
        variable = process.argv[3];
    }
    getConcert(variable);

} else if (action == "spotify-this-song") {
    // console.log("spotify-this-song");
    if (variable == undefined) {
        // variable = "The Sign by Ace of Base"
        // console.log(variable);
        // Hard-coded due to having issues loading up The Sign by Ace of Base
        console.log('Ace of Base - The Sign');
        return console.log('https://open.spotify.com/track/0hrBpAOgrt8RXigk83LLNE');
    }
    getSpotify(variable);

} else if (action == "movie-this") {
    // console.log("movie-this");
    if (variable == undefined) {
        variable = "Mr. Nobody"
    } else {
        variable = process.argv[3];
    }
    getMovie(variable);

} else if (action == "do-what-it-says") {
    // console.log("do-what-it-says");
    getRandom();
} else {
    console.log("Did you forget the action?")
}

function getConcert(variable) {
    console.log("I got into Concert");
    console.log("this is the variable: " + variable);
    


    axios.get("https://rest.bandsintown.com/artists/" + variable + "/events?app_id=codingbootcamp")
        .then(function (response) {
            // console.log(response);
            for (var i = 0; i < response.data.length; i++) {
                // console.log(response.data[i]);
                var datetime = response.data[i].datetime; //Saves datetime response into a variable
                // console.log("date/time: " + datetime);
                var dateArr = datetime.split('T'); //Attempting to split the date and time in the response
                // console.log("date/arr" + dateArr);
                // console.log("moment test: " + moment(datetime).format("MM-DD-YYYY"))

                console.log("\nVenue Name: " + response.data[i].venue.name +
                    "\nVenue Location: " + response.data[i].venue.city +
                    "\nDate of the Event: " + moment(dateArr[0]).format("MM-DD-YYYY"));
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
        } else if (data) {
            console.log("\nArtist(s) Name: ".padEnd(28) + data.tracks.items[0].album.artists[0].name +
                "\nSong Title: ".padEnd(28) + data.tracks.items[0].name +
                "\nPreview: ".padEnd(28) + data.tracks.items[0].preview_url +
                "\nAlbum Title: ".padEnd(28) + data.tracks.items[0].album.name
            )
        } else if (data == "") {

        }
    })
}

function getMovie(variable) {
    var movieKey = keys.omdb.key;
    // console.log(movieKey)
    console.log("got into getMovie");

    if (!variable) {
        variable = "Mr. Nobody";
    }
    axios.get("https://www.omdbapi.com/?t=" + variable + "&y=&plot=short&apikey=" + movieKey)
        .then(function (response) {
            console.log("\nMovie Title: ".padEnd(28) + response.data.Title +
                "\nMovie Release Year: ".padEnd(28) + response.data.Year +
                "\nIMDB Rating: ".padEnd(28) + response.data.Rated +
                "\nCountry of Production: ".padEnd(28) + response.data.Country +
                "\nLanguage: ".padEnd(28) + response.data.Language +
                "\nMovie Plot: ".padEnd(28) + response.data.Plot) +
                "\nMovie Actors: ".padEnd(28) + response.data.Actors
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getRandom() {
    fs.readFile("random.txt", "UTF8", function (data) {
        var RandomChoices = data.split(", ");
        // Random choices between 0 - 2
        var command = Math.floor((Math.random() * 3));
        var choice = Math.floor((Math.random() * RandomChoices.length))
        if (command == 0) {
            getConcert(RandomChoices[choice]);
        }
        else if (command == 1) {
            getMovie(RandomChoices[choice]);
        }
        else if (command == 2) {
            getSpotify(RandomChoices[choice]);
        }
    })
}