require('dotenv').config()


const axios =  require('axios')
let input = process.argv[2];
 console.log(input)
const artists_name = process.argv[3];

// console.log(process.env.API_BANDSINTOWN)
let api = process.env.API_BANDSINTOWN





const concertThis = function (){
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


const spotifyThisSong = function (){
  var Spotify = require('node-spotify-api');
  let track = process.argv[3]
  console.log(track)
  let spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  });
  console.log(spotify.credentials.id)


  spotify.search({ type: `Ella Mai`,query: `Dangerous`, limit: 5 }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }

console.log(data);

});
}

const movieThis = function (){
  axios.get(`https://rest.bandsintown.com/artists/${artists_name}?app_id=${api}`).then(function(response) {

    // If the request was successful...
    if (response.status === 200) {

      // Then log the data from the site!
      console.log(response.data);
    }
  });
}

const doWhatItSays = function (){
  axios.get(`https://rest.bandsintown.com/artists/${artists_name}?app_id=${api}`).then(function(response) {

    // If the request was successful...
    if (response.status === 200) {

      // Then log the data from the site!
      console.log(response.data);
    }
  });
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
