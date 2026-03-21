import React from 'react';
import { Chip } from '../Chip/Chip';
import '../Chip/Chip.css';
import './PrimaryHorizontalMenuItem.css';

export const PrimaryHorizontalMenuItem = React.forwardRef(
  (
    {
      label = 'Menu',
      state = 'default',
      size = 'regular',
      showIcon = false,
      icon,
      showCounter = false,
      counter = 3,
      showChip = false,
      chipLabel = 'Chip',
      onClick,
      className,
      ...rest
    },
    ref
  ) => {
    const classes = [
      'tab-primary-item',
      `tab-primary-item--${state}`,
      `tab-primary-item--${size}`,
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={classes}
        role="tab"
        aria-selected={state === 'active'}
        tabIndex={0}
        onClick={onClick}
        {...rest}
      >
        <div className="tab-primary-item__content-wrap">
          <div className="tab-primary-item__content">
            {showIcon && icon && (
              <span className="tab-primary-item__icon" aria-hidden="true">
                {icon}
              </span>
            )}
            <span className="tab-primary-item__label">{label}</span>
            {showCounter && (
              <span className="tab-primary-item__counter">{counter}</span>
            )}
            {showChip && (
              <Chip type="brand" variant="primary" size="xx-small">
                {chipLabel}
              </Chip>
            )}
          </div>
        </div>
        <div className="tab-primary-item__indicator" aria-hidden="true" />
      </div>
    );
  }
);

PrimaryHorizontalMenuItem.displayName = 'PrimaryHorizontalMenuItem';
