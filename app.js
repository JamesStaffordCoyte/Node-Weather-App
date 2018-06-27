const yargs = require('yargs');

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

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(results.address);
    let lat = results.latitude;
    let lng = results.longitude;

    weather.getWeather(lat, lng, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        let tempCelcius = Math.round((5 / 9) * (weatherResults.temperature - 32));
        let apparentTempCelcius = Math.round((5 / 9) * (weatherResults.apparentTemperature - 32));
        console.log(`It's currently ${tempCelcius}. It feels like ${apparentTempCelcius}`);
      }
    });
  }
});
