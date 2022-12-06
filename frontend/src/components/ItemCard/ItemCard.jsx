import React from 'react';
import PropTypes, { func, string } from 'prop-types';

import './ItemCard.css';

function ItemCard({ data, openModal }) {
  const [liked, setLiked] = React.useState(false);

  const openItemModal = (evt) => {
    openModal(evt, { ...data, visible: true });
  };

  return (
    <li role="presentation" className="card" onClick={openItemModal}>
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
        src={data.imageUrl}
        alt={`A ${data.name} for ${data.weather} weather.`}
        data-modal="preview"
      />
    </li>
  );
}

ItemCard.propTypes = {
  data: PropTypes.shape({
    _id: string,
    name: string,
    weather: string,
    imageUrl: string,
  }).isRequired,
  openModal: func.isRequired,
};

export default ItemCard;
