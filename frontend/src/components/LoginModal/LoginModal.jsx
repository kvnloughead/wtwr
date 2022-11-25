import React from 'react';
import { func, string } from 'prop-types';

import ModalWithForm from '../ModalWithForm/ModalWithForm';
import Input from '../Input/Input';
import useForm from '../../hooks/useForm';

function LoginModal({ closeModal, activeModal, openModal, onLogin }) {
  const { values, errors, isValid, handleChange, resetForm } = useForm();

  const closeAndReset = () => closeModal(resetForm);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
    closeAndReset();
  };

  return (
    <ModalWithForm
      title="Sign in"
      visible={activeModal === 'login'}
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
            data-modal="registration"
          >
            Create a new account
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
          minLength={8}
          required
        />
      </fieldset>
    </ModalWithForm>
  );
}

LoginModal.propTypes = {
  openModal: func,
  activeModal: string.isRequired,
  closeModal: func.isRequired,
  onLogin: func.isRequired,
};

LoginModal.defaultProps = {
  openModal: null,
};

export default LoginModal;
