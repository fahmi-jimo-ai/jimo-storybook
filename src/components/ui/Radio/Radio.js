import React from 'react';
import './Radio.css';

export const Radio = React.forwardRef(
  ({ label, checked, disabled, className, onChange, ...rest }, ref) => {
    const wrapperClass = [
      'radio-wrapper',
      disabled ? 'radio-wrapper--disabled' : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <label className={wrapperClass}>
        <span className="radio">
          <input
            ref={ref}
            type="radio"
            className="radio__input"
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            {...rest}
          />
          <span className="radio__circle" aria-hidden="true">
            <span className="radio__dot" />
          </span>
        </span>
        {label && <span className="radio__label">{label}</span>}
      </label>
    );
  }
);

Radio.displayName = 'Radio';
