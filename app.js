const request = require('request');
require('dotenv').config()

const KEY = process.env.GOOGLE_API_KEY;

var options = {
  url: 'https://maps.googleapis.com/maps/api/geocode/json?' +
  'address=1633 yale place rockville md 20850' +
  '&key=' + KEY,
  json: true
};
request(options, (err, response, body) => {
  // console.log(JSON.stringify(body, undefined, 2));
  console.log(`Address: ${body.results[0].formatted_address}`);
  console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
  console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
  
  
});