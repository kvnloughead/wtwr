const getWeather = ({ latitude, longitude }, key) =>
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${key}`
  ).then((res) => res.json());

const getTempDescriptor = (temp) =>
  temp > 80 ? 'hot' : temp > 60 ? 'warm' : 'cold';

const getCondition = ({ id }) => {
  if (id >= 200 && id < 300) return 'stormy';
  if (id < 600) return 'rainy';
  if (id < 700) return 'snowy';
  if (id < 800) return 'foggy';
  if (id === 800) return 'clear';
  if (id < 900) return 'cloudy';
  return '';
};

const isDay = ({ sunrise, sunset }) =>
  sunrise < Date.now() && Date.now() < sunset;

export { getWeather, getTempDescriptor, getCondition, isDay };
