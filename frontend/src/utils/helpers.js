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

const isDay = ({ sunrise, sunset }, now) =>
  sunrise * 1000 < now && now < sunset * 1000;

export { getTempDescriptor, getCondition, isDay };
