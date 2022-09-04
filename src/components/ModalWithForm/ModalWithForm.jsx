import React from 'react';
import './ModalWithForm.css';

function ModalWithForm({
  activeModal, closeModal, title, children,
}) {
  return (
    activeModal !== '' && (
      <div className="overlay">
        <div className={`modal modal_type_${activeModal}`}>
          <h2 className="modal__title">{title}</h2>
          <button className="modal__close-button" onClick={closeModal} />
          <form
            className="modal__form"
            name={activeModal}
            action=""
            method="get"
          >
            {children}
            <button className="modal__submit-button" type="submit">
              Add Garment
            </button>
          </form>
        </div>
      </div>
    )
  );
}

export default ModalWithForm;
