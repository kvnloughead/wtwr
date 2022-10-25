import React from 'react';
import { func, string } from 'prop-types';

import ModalWithForm from '../ModalWithForm/ModalWithForm';
import Input from '../Input/Input';
import RadioButton from '../RadioButton/RadioButton';
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
      <Input
        label="Name"
        placeholder="Name"
        name="name"
        type="text"
        onChange={handleChange}
        value={values.name || ''}
        error={errors.name}
      />
      <Input
        label="Image"
        placeholder="Image URL"
        name="link"
        type="url"
        onChange={handleChange}
        value={values.link || ''}
        error={errors.link}
      />
      <fieldset className="modal__fieldset">
        <legend className="modal__legend">Select the weather type:</legend>
        <RadioButton
          name="weather"
          value="hot"
          type="radio"
          handleChange={handleChange}
          label="Hot"
          checked
        />
        <RadioButton
          name="weather"
          value="warm"
          type="radio"
          handleChange={handleChange}
          label="Warm"
        />
        <RadioButton
          name="weather"
          value="cold"
          type="radio"
          handleChange={handleChange}
          label="Cold"
        />
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
