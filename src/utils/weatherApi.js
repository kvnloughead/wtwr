const getWeather = ({ latitude, longitude }, key) =>
  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${latitude},${longitude}&days=1`
  ).then((res) => res.json());

export default getWeather;
