import React from 'react';
import { shape, func, number } from 'prop-types';

import WeatherCard from '../WeatherCard/WeatherCard';
import ItemCard from '../ItemCard/ItemCard';
import { getTempDescriptor } from '../../utils/weatherApi';
import './Main.css';

const defaultClothingItems = [
  {
    _id: 0,
    name: 'Cap',
    weather: 'hot',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/cap.jpg?etag=cf33d6ac81f0613c13a5c403fc7c62da',
  },
  {
    _id: 1,
    name: 'Hoodie',
    weather: 'warm',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/hoodie.jpg?etag=1f3d3c1a154f7a9e07bd78a8f6952d9e',
  },
  {
    _id: 2,
    name: 'Jacket',
    weather: 'cold',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/jacket.jpg?etag=e2e17fc1352115d2e59511b380fccae9',
  },
  {
    _id: 3,
    name: 'Sneakers',
    weather: 'cold',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/sneakers.jpg?etag=56322fb0e0f745439c1d344c253c6855',
  },
  {
    _id: 4,
    name: 'T-Shirt',
    weather: 'hot',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/t-shirt.jpg?etag=0f94f1c569bd19d95860902fcc5c70b3',
  },
  {
    _id: 5,
    name: 'Winter coat',
    weather: 'cold',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/winter-coat.jpg?etag=2a959245bf5291c50cdbd4fcefb25a21',
  },
];

function Main({ openItemModal, weather }) {
  return (
    <main className="main">
      <WeatherCard weather={weather} />
      <h2 className="main__text">
        {`Today is ${weather.tempF}° F / You may want to wear:`}
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
