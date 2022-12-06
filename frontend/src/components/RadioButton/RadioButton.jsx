import React from 'react';
import { string, func } from 'prop-types';

import './RadioButton.css';

function RadioButton({ value, name, handleChange, label, radioChecked }) {
  return (
    <label htmlFor={value}>
      <input
        className="radio-button"
        type="radio"
        id={value}
        name={name}
        value={value}
        onChange={handleChange}
        checked={radioChecked === value}
      />
      {label}
    </label>
  );
}

RadioButton.propTypes = {
  label: string.isRequired,
  name: string.isRequired,
  handleChange: func.isRequired,
  value: string.isRequired,
  radioChecked: string.isRequired,
};

export default RadioButton;
