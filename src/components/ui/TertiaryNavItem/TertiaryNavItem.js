import React from 'react';
import { Tooltip } from '../Tooltip/Tooltip';
import '../Tooltip/Tooltip.css';
import './TertiaryNavItem.css';

export const TertiaryNavItem = ({
  icon,
  label,
  state = 'idle',
  tooltipArrowPosition = 'bottom',
  href,
  className,
  ...rest
}) => {
  const classes = [
    'nav-item-tertiary',
    state === 'hover' ? 'nav-item-tertiary--hover' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const tooltipWrapClass = [
    'nav-item-tertiary__tooltip-wrap',
    tooltipArrowPosition !== 'bottom' ? `nav-item-tertiary__tooltip-wrap--${tooltipArrowPosition}` : '',
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      <span className="nav-item-tertiary__icon" aria-hidden="true">
        {icon}
      </span>
      {label && (
        <span className={tooltipWrapClass}>
          <Tooltip arrowPosition={tooltipArrowPosition}>{label}</Tooltip>
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        aria-label={label}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <div className={classes} role="button" tabIndex={0} aria-label={label} {...rest}>
      {content}
    </div>
  );
};
