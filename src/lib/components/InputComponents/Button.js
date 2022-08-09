import React from 'react';
import Loading from '../FeedBack Components/Loading';
import './Button.scss';

function Button({ children, onClick, icon, disabled, variant = 'primary', loading }) {
  return (
    <div className={`button-wrapper ${loading ? 'loading' : ''}`}>
      <div
        className={`button ${variant} ${loading ? 'loading' : ''}`}
        type="button"
        onClick={onClick}
        disabled={loading || disabled}
      >
        {icon && <div style={{ paddingRight: 5, fontSize: 'medium' }}>{icon}</div>}
        <div>{children}</div>
      </div>
      <div className="loading-spin"></div>
      <div className="loading-mask"></div>
    </div>
  );
}

export default Button;
