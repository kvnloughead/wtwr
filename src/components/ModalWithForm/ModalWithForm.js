import React from 'react';
import './ModalWithForm.css';

const ModalWithForm = ({ activeModal, closeModal, title, children }) => {
  return (
    activeModal !== '' && (
      <div class='overlay'>
        <div className={`modal modal_type_${activeModal}`}>
          <h2 className='modal__title'>{title}</h2>
          <button className='modal__close-button' onClick={closeModal}></button>
          <form
            className={`modal__form`}
            name={activeModal}
            action=''
            method='get'
          >
            {children}
            <button className='modal__submit-button' type='submit'>
              Add Garment
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default ModalWithForm;
