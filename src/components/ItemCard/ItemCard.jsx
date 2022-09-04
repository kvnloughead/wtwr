import React from 'react';
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

export default ItemCard;
