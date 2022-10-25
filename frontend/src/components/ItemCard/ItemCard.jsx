import React from 'react';
import PropTypes, { func, number, string } from 'prop-types';

import './ItemCard.css';

function ItemCard({ data, openItemModal }) {
  const [liked, setLiked] = React.useState(false);
  const openModal = (evt) => {
    if (!evt.target.classList.contains('card__like-button'))
      openItemModal({ ...data, visible: true });
  };

  return (
    <li role="presentation" className="card" onClick={openModal}>
      <div className="card__header">
        <h3 className="card__name">{data.name}</h3>
        <button
          onClick={() => setLiked(!liked)}
          className={`card__like-button ${
            liked ? 'card__like-button_liked' : ''
          }`}
          aria-label="like button"
          type="button"
        />
      </div>

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
