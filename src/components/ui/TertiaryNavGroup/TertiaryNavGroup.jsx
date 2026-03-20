import React from 'react';
import './TertiaryNavGroup.css';

export const TertiaryNavGroup = ({
  start,
  end,
  className,
  ...rest
}) => {
  const classes = ['nav-group-tertiary', className ?? ''].filter(Boolean).join(' ');

  return (
    <div className={classes} {...rest}>
      <div className="nav-group-tertiary__start">{start}</div>
      {/* <div className="nav-group-tertiary__end">{end}</div> */}
    </div>
  );
};
