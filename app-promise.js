const yargs = require('yargs');
require('dotenv').config();
const axios = require('axios');

const google_api_key = process.env.GOOGLE_API_KEY;
const dark_sky_api_key = process.env.DARK_SKY_API_KEY;
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

const address = argv.address === '' ? 20850 : argv.address;
const encodedAddress = encodeURIComponent(address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${google_api_key}`;

axios.get(geocodeUrl).then(response => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address.');
  }
  const lat = response.data.results[0].geometry.location.lat;
  const lng = response.data.results[0].geometry.location.lng;

  const weatherUrl = `https://api.forecast.io/forecast/${dark_sky_api_key}/${lat},${lng}`
  console.log(response.data.results[0].formatted_address)
  return axios.get(weatherUrl);
}).then(response => {
  const temperature = response.data.currently.temperature;
  const apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
}).catch(e => {
  if (e.code === 'ETIMEDOUT') {
    console.log('Unable to connect to API servers');
  } else {
    console.log(e.message);
  }
});