import React, { useContext } from 'react';
import { func, string } from 'prop-types';

import ModalWithForm from '../ModalWithForm/ModalWithForm';
import Input from '../Input/Input';

import useForm from '../../hooks/useForm';
import AppContext from '../../contexts/AppContext';

function EditProfileModal({ activeModal, closeModal, onSubmit }) {
  const { currentUser } = useContext(AppContext);
  const { values, errors, isValid, handleChange, resetForm } =
    useForm(currentUser);

  const closeAndReset = (evt) => closeModal(evt, resetForm);

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(values);
    closeAndReset();
  };

  return (
    <ModalWithForm
      title="Change profile data"
      submitText="Save changes"
      activeModal={activeModal}
      closeModal={closeModal}
      onClose={closeAndReset}
      handleSubmit={handleSubmit}
      isValid={isValid}
      resetForm={resetForm}
      visible={activeModal === 'edit-profile'}
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
          required
        />
        <Input
          label="Avatar"
          placeholder="avatar"
          name="avatar"
          type="url"
          onChange={handleChange}
          value={values.avatar || ''}
          error={errors.avatar}
          required
        />
      </fieldset>
    </ModalWithForm>
  );
}

EditProfileModal.propTypes = {
  activeModal: string,
  closeModal: func.isRequired,
  onSubmit: func.isRequired,
};

EditProfileModal.defaultProps = {
  activeModal: null,
};

export default EditProfileModal;
