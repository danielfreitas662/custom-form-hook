import React, { useEffect, useRef, useState } from 'react';
import './MultiSelect.scss';
import { filterobject } from '../../utils/filters';

export default function MultiSelect({
  options = [],
  placeholder,
  value = [],
  setValue,
  name,
  id,
  inputClasses,
  onChange = () => {},
}) {
  const [show, setShow] = useState(false);
  const [classes, setClasses] = useState('mselect-content');
  const [selectoptions, setSelectOptions] = useState(options);
  const [typedValue, setTypedValue] = useState('');
  useEffect(() => {
    if (show) setClasses('mselect-content visible');
    else setClasses('mselect-content');
  }, [show]);
  useEffect(() => {
    onChange(value);
  }, [value]);
  useEffect(() => {
    setSelectOptions(options);
  }, [options]);
  const ref = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShow(false);
        setTypedValue('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
  return (
    <div className="mselect-wrapper" ref={ref} id="teste">
      <div className={`mselect-input-wrapper ${inputClasses}`} onFocus={() => setShow(true)}>
        {value.map((c, i) => (
          <div
            key={i}
            className="selected-item"
            onClick={() => {
              setValue({ target: { value: value.filter((v) => v !== c), name: name } });
            }}
          >
            {options.find((o) => o.value === c)?.label}
          </div>
        ))}
        <input
          className="mselect-input"
          value={typedValue}
          placeholder={placeholder}
          id={id}
          onChange={(e) => {
            setSelectOptions(filterobject(options, e.target.value));
            setTypedValue(e.target.value);
          }}
        />
      </div>

      <div className={classes} style={{}}>
        {selectoptions.map((c) => {
          let classes = 'mselect-option-item' + (value.includes(c.value) ? ' selected' : '');
          return (
            <div
              className={classes}
              key={c.value}
              onMouseDown={() => {
                if (value.includes(c.value)) {
                  setValue({
                    target: {
                      value: value.filter((v) => v !== c.value),
                      name: name,
                    },
                  });
                } else {
                  setValue({
                    target: {
                      value: [...value, c.value],
                      name: name,
                    },
                  });
                }
              }}
            >
              {c.label}
            </div>
          );
        })}
        {selectoptions.length === 0 && <div className="mselect-option-item">Nenhum resultado</div>}
      </div>
    </div>
  );
}
