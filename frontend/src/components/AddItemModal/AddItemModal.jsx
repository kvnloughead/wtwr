import React from 'react';
import { func, string } from 'prop-types';

import ModalWithForm from '../ModalWithForm/ModalWithForm';
import Input from '../Input/Input';
import RadioButton from '../RadioButton/RadioButton';
import useForm from '../../hooks/useForm';

function AddItemModal({ activeModal, closeModal, handleAddItemSubmit }) {
  const { values, errors, isValid, handleChange, resetForm } = useForm({
    weather: 'hot',
  });

  const closeAndReset = () => closeModal(resetForm);

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleAddItemSubmit(values);
    closeAndReset();
  };

  return (
    <ModalWithForm
      title="Create new garment"
      submitText="Create garment"
      activeModal={activeModal}
      closeModal={closeModal}
      onClose={closeAndReset}
      handleSubmit={handleSubmit}
      isValid={isValid}
      resetForm={resetForm}
      visible={activeModal === 'add-item'}
    >
      <fieldset className="modal__fieldset">
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
          name="imageUrl"
          type="url"
          onChange={handleChange}
          value={values.imageUrl || ''}
          error={errors.imageUrl}
        />
      </fieldset>

      <fieldset className="modal__fieldset modal__fieldset_radio">
        <legend className="modal__legend">Select the weather type:</legend>
        <RadioButton
          name="weather"
          value="hot"
          handleChange={handleChange}
          label="Hot"
          radioChecked={values.weather}
        />
        <RadioButton
          name="weather"
          value="warm"
          handleChange={handleChange}
          label="Warm"
          radioChecked={values.weather}
        />
        <RadioButton
          name="weather"
          value="cold"
          handleChange={handleChange}
          label="Cold"
          radioChecked={values.weather}
        />
      </fieldset>
    </ModalWithForm>
  );
}

AddItemModal.propTypes = {
  activeModal: string.isRequired,
  closeModal: func.isRequired,
  handleAddItemSubmit: func.isRequired,
};

export default AddItemModal;
