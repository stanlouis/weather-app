const yargs = require('yargs');
require('dotenv').config()
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

const encodedAddress = encodeURI(argv.address);
const google_api_key = process.env.GOOGLE_API_KEY;
const dark_sky_api_key = process.env.DARK_SKY_API_KEY;

const options = {
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${google_api_key}`,
  json: true
};

geocode.geocodeAddress(options, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage)
  } else {
    console.log(results.address);
    weather.getWeather(results.latitude, results.longitude, dark_sky_api_key, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.`);
      }
    });
  }
});