import { shape, number } from 'prop-types';
import React, { useContext } from 'react';
import './WeatherCard.css';

import TempUnitContext from '../../contexts/TempUnitContext';

function WeatherCard({ weather }) {
  const { tempUnit } = useContext(TempUnitContext);

  return (
    <div className="weather-card">
      <h2 className="weather-card__temp">
        {weather.temp[tempUnit]} °{tempUnit}
      </h2>
    </div>
  );
}

WeatherCard.propTypes = {
  weather: shape({ temp: shape({ F: number, C: number }) }).isRequired,
};

export default WeatherCard;
