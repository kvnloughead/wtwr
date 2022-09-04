import { number, shape } from 'prop-types';
import React from 'react';
import './WeatherCard.css';

function WeatherCard({ weather }) {
  return (
    <div className="weather-card">
      <h2 className="weather-card__temp">{weather.tempF} &deg;F</h2>
    </div>
  );
}

WeatherCard.propTypes = {
  weather: shape({ tempF: number }).isRequired,
};

export default WeatherCard;
