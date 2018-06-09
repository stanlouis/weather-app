const request = require('request');

module.exports = {
  geocodeAddress: (options, callback) => {
    request(options, (err, response, body) => {
      // console.log(JSON.stringify(body, undefined, 2));
      if (err) {
        callback('Unable to connect to Google servers.')
      } else if (body.status === 'ZERO_RESULTS') {
        callback('Unable to find that address.');
      } else if (body.status === 'OK') {
        callback(undefined, {
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
      }
    });
  }
}