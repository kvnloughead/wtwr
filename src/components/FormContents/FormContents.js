import React from 'react';

/**
 * Component containing form controls to pass as
 * children to ModalWithForm. CSS is found in
 * ModalWithForm.css.
 */
const FormContents = () => {
  return (
    <>
      <label htmlFor='name'>
        Name
        <input
          className='modal__input'
          placeholder='Name'
          name='name'
          type='text'
        />
      </label>
      <label htmlFor='url'>
        Image
        <input
          className='modal__input'
          placeholder='Image URL'
          name='url'
          type='url'
        />
      </label>
      <fieldset className='modal__fieldset'>
        <legend className='modal__legend'>Select the weather type:</legend>
        <label htmlFor='hot'>
          <input
            className='modal__radio-input'
            type='radio'
            id='hot'
            name='temp'
            value='hot'
            checked
          />
          Hot
        </label>
        <label htmlFor='warm'>
          <input
            className='modal__radio-input'
            type='radio'
            id='warm'
            name='temp'
            value='warm'
          />
          Warm
        </label>
        <label htmlFor='cold'>
          <input
            className='modal__radio-input'
            type='radio'
            id='cold'
            name='temp'
            value='cold'
          />
          Cold
        </label>
      </fieldset>
    </>
  );
};

export default FormContents;
