import { shape, number } from 'prop-types';
import React, { useContext } from 'react';
import './WeatherCard.css';

import TempUnitContext from '../../contexts/TempUnitContext';
import { isDay, getCondition } from '../../utils/weatherApi';

function WeatherCard({ weather }) {
  const { tempUnit } = useContext(TempUnitContext);

  return (
    <div className="weather-card">
      <h2 className="temp">
        {weather.temp[tempUnit]} °{tempUnit}
      </h2>
      <img
        src={`/images/weather/${
          isDay(weather) ? 'day' : 'night'
        }/${getCondition(weather)}.png`}
        alt="Card indicating foggy daytime weather."
      />
    </div>
  );
}

WeatherCard.propTypes = {
  weather: shape({ temp: shape({ F: number, C: number }) }).isRequired,
};

export default WeatherCard;
