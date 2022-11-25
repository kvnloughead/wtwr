import { func, string, oneOfType, arrayOf, node, bool } from 'prop-types';
import React from 'react';

// import useEscape from '../../hooks/useEscape';
import './ModalWithForm.css';

function ModalWithForm({
  activeModal,
  onClose,
  handleSubmit,
  isValid,
  title,
  submitText,
  visible,
  children,
  footer,
}) {
  // useEscape(onClose);

  return (
    <div
      className={`modal modal_type_${activeModal} ${
        visible && 'modal_is-open'
      }`}
    >
      <div className="modal__container">
        <h2 className="modal__title">{title}</h2>
        <button
          aria-label="close"
          type="button"
          className="modal__close-button"
          onClick={onClose}
        />
        <form
          className="modal__form"
          name={activeModal}
          onSubmit={handleSubmit}
        >
          {children}
          <fieldset className="modal__buttons">
            <button
              className="modal__submit-button"
              type="submit"
              disabled={!isValid}
            >
              {submitText || title}
            </button>
            {footer}
          </fieldset>
        </form>
      </div>
    </div>
  );
}

ModalWithForm.propTypes = {
  activeModal: string.isRequired,
  onClose: func.isRequired,
  handleSubmit: func.isRequired,
  title: string.isRequired,
  submitText: string,
  isValid: bool.isRequired,
  visible: bool,
  children: oneOfType([arrayOf(node), node]).isRequired,
  footer: oneOfType([arrayOf(node), node]),
};

ModalWithForm.defaultProps = {
  submitText: '',
  footer: null,
  visible: false,
};

export default ModalWithForm;
