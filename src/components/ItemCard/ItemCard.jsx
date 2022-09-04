import React from 'react';
import PropTypes, { number, string } from 'prop-types';

import './ItemCard.css';

function ItemCard({ data }) {
  return (
    <li className="card">
      <h3 className="card__name">{data.name}</h3>
      <img
        className="card__image"
        src={data.link}
        alt={`A ${data.name} for ${data.weather} weather.`}
      />
    </li>
  );
}

ItemCard.propTypes = {
  data: PropTypes.shape({
    _id: number,
    name: string,
    weather: string,
    link: string,
  }).isRequired,
};

export default ItemCard;
