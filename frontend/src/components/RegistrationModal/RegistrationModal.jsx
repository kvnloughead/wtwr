import React from 'react';
import { func, string } from 'prop-types';

import ModalWithForm from '../ModalWithForm/ModalWithForm';
import Input from '../Input/Input';
import useForm from '../../hooks/useForm';

function RegistrationModal({
  onRegistration,
  closeModal,
  activeModal,
  openModal,
}) {
  const { values, errors, isValid, handleChange, resetForm } = useForm();

  const closeAndReset = () => closeModal(resetForm);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await onRegistration(values);
    if (!res.message) closeAndReset();
  };

  return (
    <ModalWithForm
      title="Create an account"
      submitText="Register"
      visible={activeModal === 'registration'}
      activeModal={activeModal}
      onClose={closeAndReset}
      handleSubmit={handleSubmit}
      isValid={isValid}
      resetForm={resetForm}
      footer={
        <span>
          <button
            className="button button_size_small"
            type="button"
            onClick={openModal}
            data-modal="login"
          >
            Already have an account?
          </button>
        </span>
      }
    >
      <fieldset className="modal__fieldset">
        <Input
          label="Email"
          placeholder="Email"
          name="email"
          type="email"
          onChange={handleChange}
          value={values.email || ''}
          error={errors.email}
          required
        />
        <Input
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          onChange={handleChange}
          value={values.password || ''}
          error={errors.password}
          required
        />
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
          label="Avatar URL"
          placeholder="Avatar URL"
          name="avatar"
          type="url"
          onChange={handleChange}
          value={values.avatar || ''}
          error={errors.avatar}
        />
      </fieldset>
    </ModalWithForm>
  );
}

RegistrationModal.propTypes = {
  activeModal: string.isRequired,
  closeModal: func.isRequired,
  onRegistration: func.isRequired,
  openModal: func,
};

RegistrationModal.defaultProps = {
  openModal: null,
};

export default RegistrationModal;
