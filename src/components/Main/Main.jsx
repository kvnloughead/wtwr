import React, { useContext } from 'react';
import { shape, func, number } from 'prop-types';

import WeatherCard from '../WeatherCard/WeatherCard';
import ItemCard from '../ItemCard/ItemCard';
import { getTempDescriptor } from '../../utils/weatherApi';
import './Main.css';

import TempUnitContext from '../../contexts/TempUnitContext';

const defaultClothingItems = [
  {
    _id: 0,
    name: 'Cap',
    weather: 'hot',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591',
  },
  {
    _id: 1,
    name: 'Hoodie',
    weather: 'warm',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8',
  },
  {
    _id: 2,
    name: 'Jacket',
    weather: 'cold',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad',
  },
  {
    _id: 3,
    name: 'Sneakers',
    weather: 'cold',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f',
  },
  {
    _id: 4,
    name: 'T-Shirt',
    weather: 'hot',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09',
  },
  {
    _id: 5,
    name: 'Winter coat',
    weather: 'cold',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4',
  },
];

function Main({ openItemModal, weather }) {
  const { tempUnit } = useContext(TempUnitContext);

  return (
    <main className="main">
      <WeatherCard weather={weather} />
      <h2 className="main__text">
        {`Today is ${weather.temp[tempUnit]} / You may want to wear:`}
      </h2>
      <ul className="main__cards">
        {defaultClothingItems
          .filter((item) => item.weather === getTempDescriptor(weather.tempF))
          .map((item) => (
            <ItemCard
              key={item._id}
              data={item}
              openItemModal={openItemModal}
            />
          ))}
      </ul>
    </main>
  );
}

Main.propTypes = {
  openItemModal: func.isRequired,
  weather: shape({ tempF: number }).isRequired,
};

export default Main;
