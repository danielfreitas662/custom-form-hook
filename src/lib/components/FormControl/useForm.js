import React, { useRef, useState } from 'react';

export function useForm(validatingOnChange = false) {
  const [values, SetValues] = useState({});
  const [errors, SetErrors] = useState({});
  const [fields, setFields] = useState({});
  const formRef = useRef();

  const validate = (fieldsValue) => {
    let tempErrors = errors;
    if (Object.keys(fieldsValue).length > 0) {
      Object.keys(fieldsValue).forEach((field) => {
        if (fields[field]) {
          fields[field].forEach((rule) => {
            if (rule.required) {
              if (fieldsValue[field] === '' || fieldsValue[field] === null || fieldsValue[field] === undefined) {
                tempErrors[field] = rule.message;
              } else {
                tempErrors[field] = '';
              }
              SetErrors(tempErrors);
            }
          });
        }
      });
    }
    return Object.keys(tempErrors).every((x) => tempErrors[x] == '');
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (typeof name === 'object') {
      let temp = values[name[0]];
      temp[name[1]] = { ...temp[name[1]], [name[2]]: value };
      SetValues({ ...values, [name[0]]: temp });
    } else {
      SetValues({
        ...values,
        [name]: value,
      });
      if (validatingOnChange) validate({ [name]: value });
    }
  };

  const resetForm = (initialValues) => {
    SetValues(initialValues);
    SetErrors({});
  };
  const submit = () => {
    formRef.current.click();
  };
  return {
    fields,
    setFields,
    formRef,
    values,
    SetValues,
    errors,
    SetErrors,
    handleInputChange,
    resetForm,
    submit,
    validate,
  };
}
