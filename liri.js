var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var a = process.argv[2];
var b = process.argv[3];

if (a==="spotify-this-song"){
    // console.log("Yay!")
    spotify
  .search({ type: 'track', query: b, limit: 1})
  .then(function(response) {
    console.log(
        "Artist: "+response.tracks.items[0].artists[0].name,
        "\nTrack: "+response.tracks.items[0].name,
        "\nAlbum: "+response.tracks.items[0].album.name,
        "\nSample: "+response.tracks.items[0].external_urls.spotify
    );
  })
//   .catch(function(err) {
    // console.log(err);
//   });
}

if (a==="my-tweets"){
    var params = {screen_name: 'Sklooby McDoobie'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        for (i=0; i<20; i++){
            console.log(tweets[i].created_at, '\n', tweets[i].text);
        }
      }
    });
}

if (a==="movie-this"){
    request("http://www.omdbapi.com/?t="+b+"&y=&plot=short&apikey=trilogy", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(
                "The movie's title is: " + JSON.parse(body).Title,
                "\nThe came out in: " + JSON.parse(body).Title,
                "\nThe movie's rating on IMDB is: " + JSON.parse(body).imdbRating,
                "\nThe movie's title is: " + JSON.parse(body).Title,
                "\nThe movie was produced in: " + JSON.parse(body).Country,
                "\nThe movie is about: " + JSON.parse(body).Plot,
                "\nThe movie stars: " + JSON.parse(body).Actors,
            );
        }
    });
}

if (a==="do-what-it-says"){

}