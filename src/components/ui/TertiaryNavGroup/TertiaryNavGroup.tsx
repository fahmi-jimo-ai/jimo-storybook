import React from 'react';
import './TertiaryNavGroup.css';

export interface TertiaryNavGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Items rendered on the left side (grouped with gap) */
  start: React.ReactNode;
  /** Item(s) rendered on the right side */
  end: React.ReactNode;
}

export const TertiaryNavGroup: React.FC<TertiaryNavGroupProps> = ({
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
