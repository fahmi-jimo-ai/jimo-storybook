import React from 'react';
import { TertiaryNavItem } from '../TertiaryNavItem/TertiaryNavItem';
import '../TertiaryNavItem/TertiaryNavItem.css';
import './TertiaryNavGroup.css';

export const TertiaryNavGroup = ({
  items = [],
  className,
  ...rest
}) => {
  const classes = ['nav-group-tertiary', className ?? ''].filter(Boolean).join(' ');

  return (
    <div>
    <div className={classes} {...rest}>
      {items.map((item, i) => (
        <TertiaryNavItem
          key={i}
          icon={item.icon}
          label={item.label}
          href={item.href}
          tooltipArrowPosition={item.tooltipArrowPosition}
        />
      ))}
    </div>
    <div><p class="build-version">Version 1.0.0</p></div>
    </div>
  );
};
