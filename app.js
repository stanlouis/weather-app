const yargs = require('yargs');
require('dotenv').config()
const geocode = require('./geocode/geocode');

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
const KEY = process.env.GOOGLE_API_KEY;

const options = {
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${KEY}`,
  json: true
};

geocode.geocodeAddress(options, (errorMessage, results) => {
  if(errorMessage) {
    console.log(errorMessage)
  } else {
    console.log(JSON.stringify(results, undefined, 2));
  }
});