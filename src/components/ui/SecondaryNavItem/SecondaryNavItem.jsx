import React from 'react';
import './SecondaryNavItem.css';

export const SecondaryNavItem = ({
  state = 'idle',
  label,
  icon,
  iconActive,
  href,
  className,
  ...rest
}) => {
  const classes = [
    'nav-item-secondary',
    `nav-item-secondary--${state}`,
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const resolvedIcon = state === 'active' && iconActive ? iconActive : icon;

  const content = (
    <>
      <span className="nav-item-secondary__icon" aria-hidden="true">
        {resolvedIcon}
      </span>
      <span className="nav-item-secondary__label">{label}</span>
    </>
  );

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        aria-disabled={state === 'disabled'}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <div
      className={classes}
      role="button"
      tabIndex={state === 'disabled' ? -1 : 0}
      aria-disabled={state === 'disabled'}
      {...rest}
    >
      {content}
    </div>
  );
};
