import { func, string, oneOfType, arrayOf, node } from 'prop-types';
import React from 'react';
import './ModalWithForm.css';

function ModalWithForm({ activeModal, closeModal, title, children }) {
  return (
    <div
      className={`modal modal_type_${activeModal} ${
        activeModal === 'add' && 'modal_is-open'
      }`}
    >
      <div className="modal__container">
        <h2 className="modal__title">{title}</h2>
        <button
          aria-label="close"
          type="button"
          className="modal__close-button"
          onClick={closeModal}
        />
        <form className="modal__form" name={activeModal} action="" method="get">
          {children}
          <button className="modal__submit-button" type="submit">
            Add Garment
          </button>
        </form>
      </div>
    </div>
  );
}

ModalWithForm.propTypes = {
  activeModal: string.isRequired,
  closeModal: func.isRequired,
  title: string.isRequired,
  children: oneOfType([arrayOf(node), node]).isRequired,
};

export default ModalWithForm;
