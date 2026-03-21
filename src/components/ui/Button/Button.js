import React from 'react';
import './Button.css';

export const Button = React.forwardRef(
  (
    {
      level = 'primary',
      size = 'big',
      danger = false,
      iconOnly = false,
      leftIcon,
      rightIcon,
      children,
      className,
      disabled,
      ...rest
    },
    ref
  ) => {
    const classes = [
      'btn',
      `btn--${level}`,
      `btn--${size}`,
      danger ? 'btn--danger' : '',
      iconOnly ? 'btn--icon-only' : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button ref={ref} className={classes} disabled={disabled} {...rest}>
        {leftIcon && (
          <span className="btn__icon btn__icon--left" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        {!iconOnly && children && <span className="btn__label">{children}</span>}
        {rightIcon && (
          <span className="btn__icon btn__icon--right" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
