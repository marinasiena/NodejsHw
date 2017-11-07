var keys = require("./keys");


function addToLog(content) {
    fs.appendFile("log.txt", content + ", ", function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("Modified log.txt");
        }
    })
}

//not making a twitter acc- plugging in twitter things w/random info, 
//writing out code despite that
var Twitter = require('twitter');
var client = new Twitter(keys.twitterKeys);
var params = {
    screen_name: "xxxxxxxx",
    count: 5
}

var Spotify = require'SpotifyWebApi';
var Spotify = new Spotify({
    clientId: '06de408f823c46b7921e97879bff734b',
    clientsecret: '7419baf2c1dc46f9802f8989a360a1ca'
});

//request
var request = require("request");
var fs = require("request");

var userInput = process.argv[2]; //how to accommodate searching with spaces?
for (let i = 3; i < process.argv.length; i++) {
    // we want to have our userInput variable be equal to everything the user states in the command line after argv[2]
    userInput += " " + process.argv[i];
}
movieSearch(userInput);
console.log(userInput);

function movieSearch(title) {
    // console.log(title);
    request("http://www.omdbapi.com/?apikey=40e9cece&t=" + title + "&r=json", function (error, response, body) {
        data = JSON.parse(body); //This ish is crucial
        console.log(data.Title + " | " + data.Year + " | " + data.Rated + " | " + data.Plot + " | " + data.Language + " | " + data.Country + " | ");
        if (data.Ratings) {
            console.log(data.Ratings[0].Value + " | " + data.Ratings[1].Value);
        }
    });
}

function songData(query) {
    spotify.search({ type: 'track', query: query }, function(err, data) {
        if (err) {
            return console.log(err);
        }
        var obj = data.tracks.items[0];

        console.log(obj.artists[0].name + "|" + obj.name + "|" + obj.preview_url + "|" + "obj.album.name")

    });
}

function translate(com, q) {
    switch(com) {
        case "spotify-song-title": {
            var title;
            if (!q) {
                title = "Yellow Submarine";
            } else {
                title = q;
            }

            songData(title);
            addToLog (com + ": " + q);

            break;
        }

         case "movie-this": {
            var title;

            if (!q) {
                title = "Bright Whites";
            } else {
                title = q;
            }

            var queryUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=40e9cece";

            movieData(queryUrl);
            addToLog(com + ": " + q); 

            break;
        }

        case "working": {
            randomCommand();
            break;
        }

        default:
            console.log("didn't catch that.");
    }
}
        }

}

// Goal of app is to accept user input in command line and run relevant requests
// Requests include OMDB movie search, Spotify search, Twitter search, and "random" thing (i dunno)
// omdb endpoint and api key =
// spotify endpoint and api key =
// twitter endpoint and api key located in keys.js
// build out the program to read user command line input.

// command line input is received by the file as an Array
// console.log(process.argv)


// we're writing a function which will listen to what the user puts in. We should declare to the user that they must input their requests in a particular format (use inquirer?)


//program should accept 'node liri.js' + whatever the user wants to do (function) + whatever query the user wants to make within said function

