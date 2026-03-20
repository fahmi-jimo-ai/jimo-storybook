import React from 'react';
import './PrimaryNavGroup.css';

export const PrimaryNavGroup = ({
  type = 'expanded',
  children,
  className,
  ...rest
}) => {
  const classes = [
    'nav-group-primary',
    `nav-group-primary--${type}`,
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
