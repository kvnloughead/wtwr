import { useState, useCallback } from 'react';

function useForm(defaultValues = {}) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const { target } = event;
    const { name } = target;
    const { value } = target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest('form').checkValidity());
  };

  const resetForm = useCallback(() => {
    setValues(defaultValues);
    setErrors({});
    setIsValid(false);
  }, [setValues, setErrors, setIsValid]);

  return {
    values,
    errors,
    isValid,
    setIsValid,
    handleChange,
    resetForm,
  };
}

export default useForm;
