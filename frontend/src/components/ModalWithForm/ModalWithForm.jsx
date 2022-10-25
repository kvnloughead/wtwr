import { func, string, oneOfType, arrayOf, node, bool } from 'prop-types';
import React from 'react';

import useEscape from '../../hooks/useEscape';
import './ModalWithForm.css';

function ModalWithForm({
  activeModal,
  closeModal,
  handleSubmit,
  isValid,
  title,
  children,
}) {
  useEscape(closeModal);

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
        <form
          className="modal__form"
          name={activeModal}
          onSubmit={handleSubmit}
        >
          {children}
          <button
            className="modal__submit-button"
            type="submit"
            disabled={!isValid}
          >
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
  handleSubmit: func.isRequired,
  title: string.isRequired,
  isValid: bool.isRequired,
  children: oneOfType([arrayOf(node), node]).isRequired,
};

export default ModalWithForm;
