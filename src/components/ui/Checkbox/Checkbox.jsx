import React from 'react';
import './Checkbox.css';

export const Checkbox = React.forwardRef(
  ({ label, checked, indeterminate, disabled, className, onChange, ...rest }, ref) => {
    const inputRef = React.useRef(null);

    const resolvedRef = ref ?? inputRef;

    React.useEffect(() => {
      if (resolvedRef.current) {
        resolvedRef.current.indeterminate = indeterminate ?? false;
      }
    }, [indeterminate, resolvedRef]);

    const wrapperClass = ['checkbox-wrapper', disabled ? 'checkbox-wrapper--disabled' : '', className ?? '']
      .filter(Boolean)
      .join(' ');

    return (
      <label className={wrapperClass}>
        <span className="checkbox">
          <input
            ref={resolvedRef}
            type="checkbox"
            className="checkbox__input"
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            {...rest}
          />
          <span className="checkbox__box" aria-hidden="true">
            <svg className="checkbox__check" viewBox="0 0 16 16" fill="none">
              <path
                d="M3.5 8.5L6.5 11.5L12.5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </span>
        {label && <span className="checkbox__label">{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
