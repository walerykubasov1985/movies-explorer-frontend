import { useCallback, useState } from 'react';

const regex = /^[a-zA-Zа-яА-Я\sё-]+$/;


export  function useValidation() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  }); //переключатель состояния полей инпутов
  const [errors, setErrors] = useState({}); //ошибок 
  const [isValid, setIsValid] = useState(false);//валидности поля
  const [errorMessage, setErrorMessage] = useState('');//ошибки с сервера

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value; 

    const isName = name ==='name'
    const isNameValidation = isName ? regex.test(value) : true;
    const errorMessage = !isNameValidation ? event.target.validationMessage ||
    'Используйте только латиницу, кириллицу, пробел или дефис'
    : event.target.validationMessage;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: errorMessage });
    setIsValid(isNameValidation && target.closest('form').checkValidity());
  }
 
  //сброс полей
  const resetForm = useCallback(
    (resetValues = {}, resetErrors = {},  resetIsValid = false, errorMessage = '',) => {
      setValues(resetValues);
      setErrors(resetErrors);
      setIsValid(resetIsValid);
      setErrorMessage(errorMessage);
    },
    [setValues, setErrors, setIsValid, setErrorMessage]
  );

  return {setErrorMessage, errorMessage, values, errors, isValid, handleChange, resetForm, setValues, setErrors, setIsValid };
}
