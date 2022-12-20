import React, { useContext } from 'react';
import { shape, func, number } from 'prop-types';

import WeatherCard from '../WeatherCard/WeatherCard';
import './Main.css';

import AppContext from '../../contexts/AppContext';
import CardList from '../CardList/CardList';

function Main({ openModal, weather }) {
  const { tempUnit } = useContext(AppContext);

  return (
    <main className="main">
      <WeatherCard weather={weather} />
      <h2 className="main__text">
        {`Today is ${weather.temp[tempUnit]} °${tempUnit} / You may want to wear:`}
      </h2>
      <CardList openModal={openModal} weather={weather} filters={['weather']} />
    </main>
  );
}

Main.propTypes = {
  openModal: func.isRequired,
  weather: shape({ temp: shape({ F: number, C: number }) }).isRequired,
};

export default Main;
