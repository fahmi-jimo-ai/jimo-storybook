import React from 'react';
import { ArrowDown2, TickCircle, CloseCircle, Warning2 } from 'iconsax-react';
import { SpinnerIcon } from '@/components/ui/Icon';
import './Input.css';

export const Input = React.forwardRef(
  (
    {
      size = 'regular',
      status = 'none',
      inputType = 'text',
      type = 'text',
      label,
      supportiveText,
      leftIcon,
      rightIcon,
      trailingText,
      cta,
      secondarySlot,
      placeholder,
      value,
      onChange,
      disabled,
      className,
      id,
      ...rest
    },
    ref
  ) => {
    const inputId = id ?? `input-${Math.random().toString(36).slice(2)}`;

    const wrapperClass = [
      'input-field',
      `input-field--${size}`,
      status !== 'none' ? `input-field--${status}` : '',
      disabled ? 'input-field--disabled' : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    const isTextarea = inputType === 'textarea';
    const isDropdown = inputType === 'dropdown' || inputType === 'dropdown-search';

    // Resolved HTML type: dropdown variants behave like text inputs
    const resolvedHtmlType = isDropdown ? 'text' : type;

    return (
      <div className={wrapperClass}>
        {label && (
          <label className="input-field__label" htmlFor={inputId}>
            {label}
          </label>
        )}
        <div className="input-field__wrapper">
          {secondarySlot && (
            <div className="input-field__secondary">{secondarySlot}</div>
          )}
          <div className="input-field__inner">
            {leftIcon && (
              <span className="input-field__icon input-field__icon--left">{leftIcon}</span>
            )}
            {isTextarea ? (
              <textarea
                ref={ref}
                id={inputId}
                className="input-field__control input-field__control--textarea"
                placeholder={placeholder}
                value={value}
                disabled={disabled}
                onChange={onChange}
                {...rest}
              />
            ) : (
              <input
                ref={ref}
                id={inputId}
                className="input-field__control"
                type={resolvedHtmlType}
                placeholder={placeholder}
                value={value}
                disabled={disabled}
                onChange={onChange}
                {...rest}
              />
            )}
            {trailingText && (
              <span className="input-field__trailing">{trailingText}</span>
            )}
            {rightIcon && !isDropdown && (
              <span className="input-field__icon input-field__icon--right">{rightIcon}</span>
            )}
            {cta && <div className="input-field__cta">{cta}</div>}
            {isDropdown && (
              <span className="input-field__chevron" aria-hidden="true">
                <ArrowDown2 size={20} variant="Linear" />
              </span>
            )}
          </div>
          {/* Status icon — rendered outside inner so it sits at right edge of wrapper */}
          {status === 'positive' && (
            <span className="input-field__status-icon" aria-hidden="true">
              <TickCircle size={20} variant="Bold" color="currentColor" />
            </span>
          )}
          {status === 'negative' && (
            <span className="input-field__status-icon" aria-hidden="true">
              <CloseCircle size={20} variant="Bold" color="currentColor" />
            </span>
          )}
          {status === 'warning' && (
            <span className="input-field__status-icon" aria-hidden="true">
              <Warning2 size={20} variant="Bold" color="currentColor" />
            </span>
          )}
          {status === 'loading' && (
            <span className="input-field__status-icon input-field__status-icon--loading" aria-hidden="true">
              <SpinnerIcon size={20} color="currentColor" />
            </span>
          )}
        </div>
        {supportiveText && (
          <span className="input-field__supportive">{supportiveText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
