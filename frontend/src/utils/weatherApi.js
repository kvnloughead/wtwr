const getWeather = ({ latitude, longitude }, key) =>
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${key}`
  ).then((res) => res.json());

export default getWeather;
