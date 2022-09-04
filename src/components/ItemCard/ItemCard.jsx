import React from 'react';
import PropTypes, { func, number, string } from 'prop-types';

import './ItemCard.css';

function ItemCard({ data, openItemModal }) {
  return (
    <li
      role="presentation"
      className="card"
      onClick={() => openItemModal({ ...data, visible: true })}
    >
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
  openItemModal: func.isRequired,
};

export default ItemCard;
