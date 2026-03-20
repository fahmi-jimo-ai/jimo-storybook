import React from 'react';
import './SecondaryNavGroup.css';

export const SecondaryNavGroup = ({
  title,
  children,
  className,
  ...rest
}) => {
  const classes = ['nav-group-secondary', className ?? ''].filter(Boolean).join(' ');

  return (
    <div className={classes} {...rest}>
      {title && <span className="nav-group-secondary__title">{title}</span>}
      <div className="nav-group-secondary__items">{children}</div>
    </div>
  );
};
