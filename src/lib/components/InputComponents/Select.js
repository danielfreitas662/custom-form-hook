import React, { useEffect, useRef, useState } from 'react';
import './Select.scss';
import { AiOutlineClear, AiOutlineClose, AiOutlineDown } from 'react-icons/ai';
import { v4 } from 'uuid';
import { filterobject } from '../../utils/filters';

export default function Select({
  options = [],
  placeholder,
  value,
  setValue,
  name,
  id,
  inputClasses,
  allowClear = false,
  onChange = (value) => {},
}) {
  const [show, setShow] = useState(false);
  const [classes, setClasses] = useState('select-dropdown');
  const [selectoptions, setSelectOptions] = useState(options);
  const [typedValue, setTypedValue] = useState(options.find((c) => c.value === value)?.label);
  const [position, setPosition] = useState({ top: 45 });
  const ref = useRef();
  const componentRef = useRef();
  useEffect(() => {
    if (show) setClasses('select-dropdown visible');
    else setClasses('select-dropdown');
  }, [show]);
  const dpcID = useRef();
  useEffect(() => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const el = componentRef.current.getBoundingClientRect();
    if (el.y + 200 > screenHeight) {
      setPosition({ top: el.y - 200 });
    } else {
      setPosition({ top: el.y + 30 });
    }
  }, [window, show, componentRef]);

  return (
    <div className={'select-input-wrapper ' + inputClasses} ref={componentRef}>
      <input
        value={typedValue}
        className={'select-input-element'}
        autoComplete
        name={name}
        id={id}
        ref={ref}
        onFocus={() => setShow(true)}
        onBlur={() => {
          setSelectOptions(options);
          setShow(false);

          if (options.find((c) => c.label === value || c.value === value) === undefined) {
            setValue({
              target: {
                value: null,
                name: name,
              },
            });
          }
          setTypedValue(options.find((c) => c.value === value).label);
        }}
        placeholder={placeholder}
        onChange={(e) => {
          setTypedValue(e.target.value);
          setSelectOptions(filterobject(options, e.target.value));
        }}
      />
      {value && allowClear && (
        <AiOutlineClose
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setTypedValue('');
            onChange(null);
            setValue({
              target: {
                value: null,
                name: name,
              },
            });
          }}
        />
      )}
      <div className={'select-input-icon' + (show ? ' show' : '')}>
        <AiOutlineDown
          onClick={() => {
            if (show) {
              setShow(false);
            } else {
              ref.current.focus();
            }
          }}
        />
      </div>
      <div ref={dpcID} className={classes} style={position}>
        {selectoptions.map((c) => {
          let classes = 'select-option-item' + (c.value === value ? ' selected' : '');
          return (
            <div
              className={classes}
              key={c.value}
              onMouseDown={() => {
                onChange(c.value);
                setTypedValue(c.label);
                setValue({
                  target: {
                    value: c.value,
                    name: name,
                  },
                });
              }}
            >
              {c.label}
            </div>
          );
        })}
        {selectoptions.length === 0 && <div className="select-empty">Nenhum resultado</div>}
      </div>
    </div>
  );
}
