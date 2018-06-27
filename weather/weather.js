const request = require('request');

let getWeather = (lat, lng, callback) => {

  request({
    url: `https://api.darksky.net/forecast/f175e3093b4ee6b667b0cd470becd5db/${lat},${lng}`,
    json: true
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        callback(undefined, {
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature
        });
      } else {
        callback('Unable to fetch weather');
      }
  });
};

module.exports = {
  getWeather
};


//https://api.darksky.net/forecast/API/lat,lng
// f175e3093b4ee6b667b0cd470becd5db
