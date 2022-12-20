import React, { useContext } from 'react';
import { shape, func, number, arrayOf, oneOf } from 'prop-types';

import ItemCard from '../ItemCard/ItemCard';
import AppContext from '../../contexts/AppContext';
import { getTempDescriptor } from '../../utils/helpers';

import './CardList.css';

function CardList({ openModal, weather, filters }) {
  const { clothing, currentUser } = useContext(AppContext);

  const actions = {
    weather: (item) => item.weather === getTempDescriptor(weather.temp.F),
    user: (item) => item.owner === currentUser._id,
  };

  const filterCards = (item) =>
    filters.every((filterName) => actions[filterName](item));

  return (
    <ul role="list" className="cards">
      {clothing
        .filter((item) => filterCards(item))
        .map((item) => (
          <ItemCard key={item._id} data={item} openModal={openModal} />
        ))}
    </ul>
  );
}

CardList.propTypes = {
  openModal: func.isRequired,
  filters: arrayOf(oneOf(['weather', 'user'])).isRequired,
  weather: shape({ temp: shape({ F: number, C: number }) }).isRequired,
};

export default CardList;
