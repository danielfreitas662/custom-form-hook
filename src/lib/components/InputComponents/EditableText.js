import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineEnter } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import './EditableText.scss';

function EditableText({ id, name, initialValue, onSubmit = (value) => {} }) {
  const [edit, setEdit] = useState(false);
  const [tempValue, setTempValue] = useState(initialValue);
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef();
  useEffect(() => {
    if (edit) {
      inputRef.current.focus();
    }
  }, [edit]);
  return (
    <div className="editable-text">
      <div className={`edit-text ${edit ? 'visible' : ''}`}>
        <input
          ref={inputRef}
          value={tempValue}
          onBlur={() => {
            setEdit(false);
            setTempValue(value);
          }}
          onKeyDown={(key) => {
            if (key.key === 'Enter') {
              setEdit(false);
              setValue(tempValue);
              onSubmit(tempValue);
            } else if (key.key === 'Escape') {
              setEdit(false);
              setTempValue(value);
            }
          }}
          onChange={(e) => {
            setTempValue(e.target.value);
          }}
        />
        <AiOutlineEnter />
      </div>
      <div className={`text-label ${edit ? '' : 'visible'}`}>
        <span className="label">{value}</span>
        <FaEdit
          className="edit"
          onClick={() => {
            setEdit(true);
          }}
        />
      </div>
    </div>
  );
}

export default EditableText;
