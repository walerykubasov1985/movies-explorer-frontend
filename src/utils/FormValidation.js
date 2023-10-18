import { useState, useCallback } from 'react';


export function useFormValidation() {
  
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  

  function handleChange(e) {
    const input = e.target;
    const name = input.name;
    const value = input.value;

    setValues({...values, [name]: value});
    setErrors({...errors, [name]: input.validationMessage});
    setIsValid(input.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (resetValues = {}, resetErrors = {},  resetIsValid = false, errorMessage = '',) => {
      setValues(resetValues);
      setErrors(resetErrors);
      setIsValid(resetIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

    return {values, errors, isValid, handleChange, setValues, setIsValid, setErrors, resetForm};
};