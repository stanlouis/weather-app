const request = require('request');

request({
  url: 'https://maps.googleapis.com/maps/api/geocode/json?address=1633+yale+place+rockville+md+20850',
  json: true
}, (err, response, body) => {
  console.log(JSON.stringify(body, undefined, 2));
});