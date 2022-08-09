import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import './TextInput.scss';

function TextInput({ placeholder, type = 'text', value, setValue, name, id, inputClasses, fullWidth, style = {} }) {
  const [show, setShow] = useState(false);
  return (
    <div
      className={`input-text-wrapper ${inputClasses}`}
      style={{ ...style, display: fullWidth ? 'flex' : 'inline-flex' }}
    >
      <input
        className="input-text-input"
        value={value}
        name={name}
        id={id}
        type={type === 'password' ? (show ? 'text' : 'password') : 'text'}
        placeholder={placeholder}
        onChange={setValue}
      />
      {type === 'password' && (
        <div className="input-text-eye">
          {show && <AiFillEye onClick={() => setShow(!show)} />}
          {!show && <AiFillEyeInvisible onClick={() => setShow(!show)} />}
        </div>
      )}
    </div>
  );
}

export default TextInput;
