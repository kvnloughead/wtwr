import React from 'react';
// import React, { useState, useCallback } from 'react';
import { func, string } from 'prop-types';

import ModalWithForm from '../ModalWithForm/ModalWithForm';
import useForm from '../../hooks/useForm';
import './AddItemModal.css';

function AddItemModal({
  activeModal,
  openAddModal,
  closeModal,
  handleAddItemSubmit,
}) {
  const { values, errors, isValid, handleChange, resetForm } = useForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddItemSubmit(values);
    closeModal();
    resetForm();
  };

  return (
    <ModalWithForm
      title="New garment"
      activeModal={activeModal}
      openAddModal={openAddModal}
      closeModal={closeModal}
      handleSubmit={handleSubmit}
      isValid={isValid}
      resetForm={resetForm}
    >
      <label htmlFor="name">
        Name
        <input
          className="modal__input"
          placeholder="Name"
          name="name"
          type="text"
          onChange={handleChange}
          value={values.name || ''}
          required
        />
        <span className="modal__input-error">{errors.name}</span>
      </label>
      <label htmlFor="link">
        Image
        <input
          className="modal__input"
          placeholder="Image URL"
          name="link"
          type="url"
          onChange={handleChange}
          value={values.link || ''}
          required
        />
        <span className="modal__input-error">{errors.link}</span>
      </label>
      <fieldset className="modal__fieldset">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot">
          <input
            className="modal__radio-input"
            type="radio"
            id="hot"
            name="weather"
            value="hot"
            onChange={handleChange}
            checked
          />
          Hot
        </label>
        <label htmlFor="warm">
          <input
            className="modal__radio-input"
            type="radio"
            id="warm"
            name="weather"
            value="warm"
            onChange={handleChange}
          />
          Warm
        </label>
        <label htmlFor="cold">
          <input
            className="modal__radio-input"
            type="radio"
            id="cold"
            name="weather"
            value="cold"
            onChange={handleChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

AddItemModal.propTypes = {
  activeModal: string.isRequired,
  closeModal: func.isRequired,
  openAddModal: func.isRequired,
  handleAddItemSubmit: func.isRequired,
};

export default AddItemModal;
