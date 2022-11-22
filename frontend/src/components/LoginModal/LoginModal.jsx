import React from 'react';
import { func, string } from 'prop-types';

import ModalWithForm from '../ModalWithForm/ModalWithForm';
import Input from '../Input/Input';
import useForm from '../../hooks/useForm';

function LoginModal({ handleLogin, closeModal, activeModal, openModal }) {
  const { values, errors, isValid, handleChange, resetForm } = useForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(values);
    closeModal();
    resetForm();
  };

  return (
    <ModalWithForm
      title="Sign in"
      visible={activeModal === 'login'}
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
            data-modal="registration"
          >
            Create a new account
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
        minlength={8}
        required
      />
    </ModalWithForm>
  );
}

LoginModal.propTypes = {
  openModal: func,
  activeModal: string.isRequired,
  closeModal: func.isRequired,
  handleLogin: func.isRequired,
};

LoginModal.defaultProps = {
  openModal: null,
};

export default LoginModal;
