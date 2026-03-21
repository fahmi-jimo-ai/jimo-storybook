import React from 'react';
import { CloseCircle } from 'iconsax-react';
import './Chip.css';

export const Chip = ({
  type = 'neutral',
  variant = 'secondary',
  size = 'regular',
  children,
  leftIcon,
  rightIcon,
  iconOnly = false,
  onRemove,
  className,
}) => {
  const classes = [
    'chip',
    `chip--${type}`,
    `chip--${variant}`,
    `chip--${size}`,
    iconOnly ? 'chip--icon-only' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes}>
      {iconOnly ? (
        leftIcon ?? rightIcon
      ) : (
        <>
          {leftIcon && <span className="chip__icon">{leftIcon}</span>}
          {children && <span className="chip__label">{children}</span>}
          {rightIcon && !onRemove && <span className="chip__icon">{rightIcon}</span>}
        </>
      )}
      {onRemove && (
        <button
          type="button"
          className="chip__remove"
          onClick={onRemove}
          aria-label="Remove"
        >
          <CloseCircle size={16} variant="Bold" color="currentColor" />
        </button>
      )}
    </span>
  );
};
