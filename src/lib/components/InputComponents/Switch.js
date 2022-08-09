import React, { useState } from 'react';
import './Switch.scss';

function Switch({ children, value = false, onChange = () => {}, id, name, setValue }) {
  const [v, setV] = useState(value);
  return (
    <div className="switch">
      <div
        className={`switch-button ${v ? 'on' : 'off'}`}
        id={id}
        onClick={() => {
          onChange(!v);
          setV(!v);
          setValue({ target: { value: !v, name: name } });
        }}
      >
        <div className="switch-indicator"></div>
      </div>
      <div className="switch-label">{children}</div>
    </div>
  );
}

export default Switch;
