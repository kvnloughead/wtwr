import React, { useState } from 'react';
import { string, func, bool } from 'prop-types';

import './RadioButton.css';

function RadioButton({ value, type, name, handleChange, label, checked }) {
  const [isChecked, setIsChecked] = useState(checked);
  const onChange = (evt) => {
    setIsChecked(true);
    handleChange(evt);
  };

  return (
    <label htmlFor={value}>
      <input
        className="radio-button"
        type={type}
        id={value}
        name={name}
        value={value}
        onChange={onChange}
        checked={isChecked}
      />
      {label}
    </label>
  );
}

RadioButton.propTypes = {
  label: string.isRequired,
  name: string.isRequired,
  type: string.isRequired,
  handleChange: func.isRequired,
  value: string.isRequired,
  checked: bool,
};

RadioButton.defaultProps = {
  checked: false,
};

export default RadioButton;
