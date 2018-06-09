const request = require('request');
const yargs = require('yargs');
require('dotenv').config()

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
request(options, (err, response, body) => {
  // console.log(JSON.stringify(body, undefined, 2));
  console.log(`Address: ${body.results[0].formatted_address}`);
  console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
  console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
});