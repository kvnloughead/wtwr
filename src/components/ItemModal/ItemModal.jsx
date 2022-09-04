import { shape, number, string, func } from 'prop-types';
import React from 'react';

import './ItemModal.css';

function ItemModal({ card, closeModal, activeModal }) {
  return (
    <div className={`modal ${activeModal === 'preview' && 'modal_is-open'}`}>
      <div className="modal__container modal__container_type_preview">
        <button
          aria-label="close"
          type="button"
          className="modal__close-button"
          onClick={closeModal}
        />
        <img
          className="modal__image"
          src={card.link}
          alt={`A ${card.name} for wearing in ${card.weather} weather.`}
        />
        <h3 className="modal__caption">{card.name}</h3>
        <p className="modal__weather">Weather: {card.weather}</p>
      </div>
    </div>
  );
}

ItemModal.propTypes = {
  card: shape({
    _id: number,
    name: string,
    weather: string,
    link: string,
  }).isRequired,
  closeModal: func.isRequired,
  activeModal: string.isRequired,
};

export default ItemModal;
