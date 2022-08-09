import React, { createContext, useContext, useEffect, useState } from 'react';
import './Radio.scss';

const RadioContext = createContext();

function Radio({ children, value, onChange = () => {}, id, name, setValue = () => {} }) {
  const [selectedValue, setSelectedValue] = useState(value);
  useEffect(() => {
    setValue({ target: { value: selectedValue, name: name } });
  }, [selectedValue]);
  return (
    <RadioContext.Provider value={[selectedValue, setSelectedValue, onChange]}>
      <div className="radio" id={id}>
        {children}
      </div>
    </RadioContext.Provider>
  );
}
function Option({ children, value }) {
  const [selectedValue, setSelectedValue, onChange] = useContext(RadioContext);
  return (
    <div
      className="container"
      onClick={() => {
        setSelectedValue(value);
        onChange(value);
      }}
    >
      <span className={`checkmark ${selectedValue === value ? 'checked' : ''}`}>
        <span className="white" />
      </span>
      <span>{children}</span>
    </div>
  );
}
Radio.Option = Option;
export default Radio;
