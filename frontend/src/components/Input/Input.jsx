/* eslint-disable react/jsx-props-no-spreading */
import { string, func, bool } from 'prop-types';
import React from 'react';
import './Input.css';

function Input({
  label,
  placeholder,
  name,
  type,
  onChange,
  value,
  error,
  required,
  ...rest
}) {
  return (
    <label className="label" htmlFor={name}>
      {label}
      <span className="required">{required ? '*required' : ''}</span>
      <input
        className="input"
        placeholder={placeholder}
        name={name}
        type={type}
        onChange={onChange}
        value={value}
        required={required}
        {...rest}
      />
      <span className="error-message">{error}</span>
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
  required: bool,
};

Input.defaultProps = {
  error: '',
  required: false,
};

export default Input;
