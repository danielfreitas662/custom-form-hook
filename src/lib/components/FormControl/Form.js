import React, { useEffect, useReducer, useRef, useState } from 'react';
import { v4 } from 'uuid';
import './FormField.scss';
import flatten from 'flat';

const FormContext = React.createContext();
const FormListContext = React.createContext();

function useForm(initialValues = {}) {
  const toPlain = (v) => {
    return flatten(v, { delimiter: ',' });
  };
  const toNested = (v) => {
    return flatten.unflatten(v, { delimiter: ',' });
  };
  const valuesReducer = (state, data) => {
    let tempValues = toNested(state);
    tempValues = { ...tempValues, ...data };
    return toPlain(tempValues);
  };
  const [values, SetValues] = useReducer(valuesReducer, toPlain(initialValues));
  const [errors, SetErrors] = useState({});
  const [fields, SetFields] = useState({});
  const formRef = useRef();
  const submit = () => {
    formRef.current.click();
  };
  const getValues = () => {
    return toNested(values);
  };
  return {
    fields,
    getValues,
    SetFields,
    formRef,
    values,
    SetValues,
    errors,
    SetErrors,
    submit,
    toPlain,
    toNested,
  };
}

export function Form({
  children,
  form,
  onFinish = () => {},
  labelCol = 10,
  wrapperCol = 14,
  colon = false,
  onChange = () => {},
  name = '',
  layout = 'vertical',
  validatingOnChange = true,
}) {
  const validate = (fieldsValue) => {
    let tempErrors = form.errors;
    Object.keys(fieldsValue).map((c) => (tempErrors[c] = []));
    if (Object.keys(fieldsValue).length > 0) {
      Object.keys(fieldsValue).forEach((field) => {
        if (form.fields[field]) {
          form.fields[field].forEach((rule) => {
            if (rule.required) {
              if (
                fieldsValue[field] === '' ||
                fieldsValue[field] === null ||
                fieldsValue[field] === undefined ||
                fieldsValue[field].length === 0
              ) {
                tempErrors[field] = [...tempErrors[field], rule.message];
              }
            }
            if (rule.pattern) {
              console.log(fieldsValue[field], rule.pattern.test(fieldsValue[field]));
              if (!RegExp(rule.pattern).test(fieldsValue[field])) {
                tempErrors[field] = [...tempErrors[field], rule.message];
              }
            }
          });
        }
      });
      form.SetErrors({ ...tempErrors });
    }

    return Object.keys(tempErrors).every((x) => tempErrors[x] == '');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (typeof name === 'object') {
      let temp = form.values[name[0]];
      temp[name[1]] = { ...temp[name[1]], [name[2]]: value };
      form.SetValues({ ...form.values, [name[0]]: temp });
    } else {
      form.SetValues({
        ...form.values,
        [name]: value,
      });
      if (validatingOnChange) validate({ [name]: value });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let v = {};
    Object.keys(form.fields).forEach((c) => (v[c] = form.values[c]));
    validate(v);
    const validation = validate(v);
    if (validation) {
      onFinish(form.toNested(form.values));
    }
  };

  return (
    <FormContext.Provider value={{ labelCol, wrapperCol, colon, onChange, layout, form, handleInputChange }}>
      <form name={name}>
        {children}
        <button type="button" ref={form.formRef} hidden onClick={handleSubmit}>
          Teste
        </button>
      </form>
    </FormContext.Provider>
  );
}

function FormField({
  children,
  name,
  type,
  label,
  required,
  fullWidth,
  rules = [
    { required: false, message: '' },
    { pattern: '', message: '' },
    { custom: () => {}, message: '' },
  ],
}) {
  const context = React.useContext(FormContext);
  const listcontext = React.useContext(FormListContext);
  if (context) {
    const { labelCol, wrapperCol, colon, layout, form, handleInputChange } = context;
    const labelSize = (100 * labelCol) / 24;
    const wrapperSize = (100 * wrapperCol) / 24;
    const fieldid = v4();
    useEffect(() => {
      let fields = form.fields;
      if (listcontext) {
        let tempName = [listcontext, ...name];
        fields[tempName] = rules;
      } else {
        fields[name] = rules;
      }
      form.SetFields(fields);
    }, [form.fields]);
    return (
      <div
        className="formfield-wrapper"
        style={{ display: layout === 'vertical' ? 'block' : 'flex' }}
        id={`formfield-${fieldid}`}
      >
        <div
          className={`formfield-label ${required ? 'required' : ''} ${colon ? 'colon' : ''}`}
          style={{ flex: `1 0 calc(${labelSize}%)`, textAlign: layout === 'vertical' ? '' : 'end' }}
        >
          <label htmlFor={`form-item-${name}`} className={`${required ? 'required' : ''} ${colon ? 'colon' : ''}`}>
            {label}
          </label>
        </div>
        <div className="formfield-field" style={{ flex: `1 0 ${wrapperSize}%` }}>
          {React.isValidElement(children) &&
            React.cloneElement(children, {
              setValue: handleInputChange,
              value: listcontext ? form.values[[listcontext, ...name]] : form.values[name],
              name: listcontext ? [listcontext, ...name] : name,
              id: `form-item-${listcontext ? [listcontext, ...name] : name}`,
              inputClasses:
                (listcontext ? form.errors[[listcontext, ...name]]?.length : form.errors[name]?.length) > 0
                  ? ' error'
                  : '',
              fullWidth: fullWidth ? true : false,
              type: type,
            })}
          {(listcontext ? form.errors[[listcontext, ...name]]?.length : form.errors[name]?.length) > 0 && (
            <div
              className={
                (listcontext ? form.errors[[listcontext, ...name]]?.length : form.errors[name]?.length) > 0
                  ? 'helper error'
                  : 'helper'
              }
            >
              {(listcontext ? form.errors[[listcontext, ...name]] : form.errors[name]).map((c) => (
                <div>{c}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  } else {
    throw new Error('FormField is not wrapped in a Form provider');
  }
}

const List = ({ name, children }) => {
  const context = React.useContext(FormContext);
  if (!context) {
    throw new Error('Form List is not wrapped in a Form provider');
  } else {
    const { labelCol, wrapperCol, colon, layout, form, handleInputChange } = context;
    const addItem = (item) => {
      let newvalues = form.toNested(form.values);
      newvalues[name] = [...newvalues[name], item];
      form.SetValues({ ...form.toPlain(newvalues) });
      //form.SetValues({ ...form.values, [name]: '' });
    };
    const removeItem = (fieldName) => {
      let newfields = form.fields;
      let names = Object.keys(form.fields);
      names.forEach((c) => {
        let slice = c.split(',');
        if (slice[0] === name && slice[1] === fieldName) {
          delete newfields[c];
        }
      });

      let newvalues = form.toNested(form.values);
      newvalues[name] = newvalues[name].filter((c, i) => fieldName != i);
      form.SetValues({ ...form.toPlain(newvalues) });
      form.SetFields({ ...newfields });
    };
    return (
      <div className="formlist">
        <FormListContext.Provider value={name}>
          {children(
            Object.keys(form.toNested(form.values)[name]).map((c, i) => {
              return { key: c, index: i };
            }),
            { addItem, removeItem }
          )}
        </FormListContext.Provider>
      </div>
    );
  }
};

Form.Field = FormField;
Form.List = List;
Form.useForm = useForm;

export default Form;
