import React from 'react';
import './SecondaryNavGroup.css';

export interface SecondaryNavGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional section title rendered above the item container */
  title?: string;
  children: React.ReactNode;
}

export const SecondaryNavGroup: React.FC<SecondaryNavGroupProps> = ({
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
