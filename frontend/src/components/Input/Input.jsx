import { string, func } from 'prop-types';
import React from 'react';
import './Input.css';

function Input({ label, placeholder, name, type, onChange, value, error }) {
  return (
    <label htmlFor={name}>
      {label}
      <input
        className="input"
        placeholder={placeholder}
        name={name}
        type={type}
        onChange={onChange}
        value={value}
        required
      />
      <span className="input__error">{error}</span>
    </label>
  );
}

Input.propTypes = {
  label: string.isRequired,
  placeholder: string.isRequired,
  name: string.isRequired,
  type: string.isRequired,
  onChange: func.isRequired,
  value: string.isRequired,
  error: string,
};

Input.defaultProps = {
  error: '',
};

export default Input;
