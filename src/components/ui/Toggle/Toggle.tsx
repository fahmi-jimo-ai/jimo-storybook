import React from 'react';
import './Toggle.css';

export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Visible label text */
  label?: React.ReactNode;
  /** Controlled checked state */
  checked?: boolean;
  /** Disabled state */
  disabled?: boolean;
  className?: string;
}

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  ({ label, checked, disabled, className, onChange, ...rest }, ref) => {
    const wrapperClass = [
      'toggle-wrapper',
      disabled ? 'toggle-wrapper--disabled' : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <label className={wrapperClass}>
        <span className="toggle">
          <input
            ref={ref}
            type="checkbox"
            className="toggle__input"
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            role="switch"
            {...rest}
          />
          <span className="toggle__track" aria-hidden="true">
            <span className="toggle__thumb">
              {/* Checkmark shows when checked */}
              <svg className="toggle__check" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 7.5L5.5 10L11 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </span>
        </span>
        {label && <span className="toggle__label">{label}</span>}
      </label>
    );
  }
);

Toggle.displayName = 'Toggle';
