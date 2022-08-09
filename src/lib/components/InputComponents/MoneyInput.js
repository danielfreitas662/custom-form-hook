import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import './TextInput.scss';

function MoneyInput({ placeholder, value, setValue, name, id, inputClasses, fullWidth, style = {} }) {
  const format = (v) => {
    if (parseFloat(v)) {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);
    } else {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(0);
    }
  };
  const [inputValue, setInputValue] = useState(format(value));
  const outputFormat = (value) => ({ target: { value: value, name: name } });
  const handleChange = (e) => {
    let tempValue = e.target.value;
    if (tempValue[tempValue.length - 1].match(/[^\d]/g)) {
      setInputValue(tempValue.pop());
    }
    tempValue = tempValue.replace(/[^,.\d]/g, '').trim();
    tempValue = tempValue.replace(/\./g, '');
    let lastValue = inputValue;
    lastValue = lastValue.replace(/[^,.\d]/g, '').trim();
    lastValue = lastValue.replace(/\./g, '');
    if (parseFloat(tempValue) && tempValue.match(/,/i) === null) {
      tempValue = `0.0${tempValue}`;
      setInputValue(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(tempValue));
      setValue(outputFormat(Number(tempValue)));
    } else if (tempValue.length > lastValue.length) {
      let parts = tempValue.split(',');
      parts[0] = parts[0] + parts[1][0];
      parts[1] = parts[1].slice(1, parts[1].length);
      parts = parts[0] + '.' + parts[1];
      setInputValue(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parts));
      setValue(outputFormat(Number(parts)));
    } else {
      let parts = tempValue.split(',');
      parts[1] = parts[0][parts[0].length - 1] + parts[1];
      parts[0] = parts[0].slice(0, parts[0].length - 1);
      parts = parts[0] + '.' + parts[1];
      setInputValue(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parts));
      setValue(outputFormat(Number(parts)));
    }
  };
  return (
    <div
      className={`input-text-wrapper ${inputClasses}`}
      style={{ ...style, display: fullWidth ? 'flex' : 'inline-flex' }}
    >
      <input
        className="input-text-input"
        value={inputValue}
        name={name}
        id={id}
        type={'text'}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
}

export default MoneyInput;
