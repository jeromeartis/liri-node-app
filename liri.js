require('dotenv').config()


const axios =  require('axios')
let input = process.argv[2];



const concertThis = function (){
  const artists_name = process.argv[3];

  // console.log(process.env.API_BANDSINTOWN)
  let api = process.env.API_BANDSINTOWN
  axios.get(`https://rest.bandsintown.com/artists/${artists_name}/events?app_id=${api}`).then(function(response) {

    // If the request was successful...


      // Then log the data from the site!
      for (let i = 0; i < response.data.length; i++){
          if (response.status === 200) {

            console.log(`Venue Name: ${response.data[i].venue.name}`);
            console.log(`Venue Country: ${response.data[i].venue.country}`);
            console.log(`Venue Region: ${response.data[i].venue.region}`);
            console.log(`Venue City: ${response.data[i].venue.city}`);
          }
    }
  });
}


const spotifyThisSong = function (trackName){
  const Spotify = require('node-spotify-api');
  let track = process.argv[3]; || trackName
  

  let spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  });



  spotify.search({ type: 'track',query: `${track}`, limit: 5 }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
  if (track){
    for (let i = 0; i < data.tracks.items.length; i++){

    console.log(`Artists: ${data.tracks.items[i].artists[0].name}`);
    console.log(`Song Name: ${data.tracks.items[i].name}`)
    console.log(`Preview link Song: ${data.tracks.items[i].preview_url}`)
    console.log(`Album: ${data.tracks.items[i].album.name}`)

  }

  } else {
    console.log("What's My Age Again by blink-182")
    console.log(track);
  }

});
}

const movieThis = function (){
  let api = process.env.OBDB_API
  let input = process.argv[3]

  axios.get(`http://www.omdbapi.com/?t=${input}&apikey=${api}`).then(function(response) {
    if (input){

    console.log(`Title of the movie: ${response.data.Title}`);
    console.log(`Year the movie came out: ${response.data.Year}`);
    console.log(`IMDB Rating of the movie: ${response.data.Ratings[0].Value}`);
    console.log(`Rotten Tomatoes Rating of the movie: ${response.data.Ratings[1].Value}`);
    console.log(`Country where the movie was produced: ${response.data.Country}`);
    console.log(`Language of the movie: ${response.data.Language}`);
    console.log(`Plot of the movie: ${response.data.Plot}`);
    console.log(`Actors in the movie.: ${response.data.Actors}`);
    }
    else{
      console.log("Mr. Nobody");
    }
 })
 .catch(function (error) {
   console.log(error);
 });

}

const doWhatItSays = function (){
  const fs = require('fs')
  fs.readFile('random.txt', 'utf8', function(error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    // We will then print the contents of data
  const dataList = data.split(',');
  let input = dataList[1];
  // We will then re-display the content as an array for later use.
  console.log(dataList[0]);
 console.log (dataList[1]);
 spotifyThisSong(dataList[1]);
  });
  return
}


switch (input) {
  case 'concert-this':
    concertThis();
    break;
  case 'spotify-this-song':
    spotifyThisSong();
    break;
  case 'movie-this':
    movieThis();
    break;
  case 'do-what-it-says':
    doWhatItSays();
    break;
  default:

}
