import React, { useContext } from 'react';
import { shape, func, number } from 'prop-types';

import WeatherCard from '../WeatherCard/WeatherCard';
import ItemCard from '../ItemCard/ItemCard';
import { getTempDescriptor } from '../../utils/helpers';
import './Main.css';

import AppContext from '../../contexts/AppContext';

function Main({ openModal, weather }) {
  const { tempUnit, clothing } = useContext(AppContext);

  return (
    <main className="main">
      <WeatherCard weather={weather} />
      <h2 className="main__text">
        {`Today is ${weather.temp[tempUnit]} °${tempUnit} / You may want to wear:`}
      </h2>
      <ul role="list" className="cards">
        {clothing
          .filter((item) => item.weather === getTempDescriptor(weather.temp.F))
          .map((item) => (
            <ItemCard key={item._id} data={item} openModal={openModal} />
          ))}
      </ul>
    </main>
  );
}

Main.propTypes = {
  openModal: func.isRequired,
  weather: shape({ temp: shape({ F: number, C: number }) }).isRequired,
};

export default Main;
