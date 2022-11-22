import React from 'react';
import { func, string } from 'prop-types';

import ModalWithForm from '../ModalWithForm/ModalWithForm';
import Input from '../Input/Input';
import useForm from '../../hooks/useForm';
import './RegistrationModal.css';

function RegistrationModal({
  handleRegistration,
  closeModal,
  activeModal,
  openModal,
}) {
  const { values, errors, isValid, handleChange, resetForm } = useForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(values);
    closeModal();
    resetForm();
  };

  return (
    <ModalWithForm
      title="Create an account"
      submitText="Register"
      visible={activeModal === 'registration'}
      activeModal={activeModal}
      closeModal={closeModal}
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
    </ModalWithForm>
  );
}

RegistrationModal.propTypes = {
  activeModal: string.isRequired,
  closeModal: func.isRequired,
  handleRegistration: func.isRequired,
  openModal: func,
};

RegistrationModal.defaultProps = {
  openModal: null,
};

export default RegistrationModal;
