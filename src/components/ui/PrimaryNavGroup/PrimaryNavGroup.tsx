import React from 'react';
import './PrimaryNavGroup.css';

export type PrimaryNavGroupType = 'expanded' | 'collapsed';

export interface PrimaryNavGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Layout type — matches the parent sidebar's collapsed state */
  type?: PrimaryNavGroupType;
  children: React.ReactNode;
}

export const PrimaryNavGroup: React.FC<PrimaryNavGroupProps> = ({
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
